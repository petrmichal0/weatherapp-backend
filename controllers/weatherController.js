const axios = require("axios");
const AppError = require("../utils/appError");

const apiKey = process.env.WEATHER_API_KEY;

const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new AppError("Failed to fetch weather data", 500);
  }
};

exports.getWeatherForecast = async (req, res, next) => {
  const { cityName, days } = req.query;

  if (!cityName || !days) {
    return next(new AppError("Please provide cityName and days", 400));
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=${days}`;
  const data = await fetchWeatherData(url);

  res.status(200).json({
    status: "success",
    data,
  });
};

exports.getLocations = async (req, res, next) => {
  const { cityName } = req.query;

  if (!cityName) {
    return next(new AppError("Please provide cityName", 400));
  }

  const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${cityName}`;
  const data = await fetchWeatherData(url);

  res.status(200).json({
    status: "success",
    data,
  });
};
