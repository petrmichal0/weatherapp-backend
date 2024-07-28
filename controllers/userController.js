const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getUser = (req, res) => {
  if (res.locals.user) {
    res.status(200).json({
      status: "success",
      data: {
        user: res.locals.user,
      },
    });
  } else {
    res.status(200).json({
      status: "fail",
      message: "User is not logged in",
    });
  }
};

exports.getCity = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      city: req.params.city,
    },
  });
};

exports.addFavoriteCity = async (req, res) => {
  try {
    // Logování obsahu req.user
    console.log("req.user:", req.user);

    const { cityName, country } = req.body;

    // Kontrola, zda req.user obsahuje id
    if (!req.user || !req.user._id) {
      return res.status(400).json({
        status: "fail",
        message: "User ID is missing from request",
      });
    }

    // Ensure cityName and country are provided
    if (!cityName || !country) {
      return res.status(400).json({
        status: "fail",
        message: "City name and country are required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    user.favorites.push({ cityName, country });
    await user.save({ validateBeforeSave: false }); // Save without running validators

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.removeFavoriteCity = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError("No user found with this ID", 404));
  }

  const { cityName, country } = req.body;

  if (!cityName || !country) {
    return next(new AppError("City name and country are required", 400));
  }

  user.favorites = user.favorites.filter(
    (city) => city.cityName !== cityName || city.country !== country
  );

  await user.save({ validateBeforeSave: false }); // Save without running validators

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
