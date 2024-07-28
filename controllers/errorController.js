const AppError = require("./../utils/appError");

const handleDBErrors = (err) => {
  if (err.name === "CastError")
    return new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
  if (err.code === 11000)
    return new AppError(
      `Duplicate field value: ${
        err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
      }. Please use another value!`,
      400
    );
  if (err.name === "ValidationError")
    return new AppError(
      `Invalid input data. ${Object.values(err.errors)
        .map((el) => el.message)
        .join(". ")}`,
      400
    );
  return err;
};

const handleJWTErrors = (err) => {
  if (err.name === "JsonWebTokenError")
    return new AppError("Invalid token. Please log in again!", 401);
  if (err.name === "TokenExpiredError")
    return new AppError("Your token has expired! Please log in again.", 401);
  return err;
};

const sendError = (err, req, res, isDev) => {
  if (req.originalUrl.startsWith("/api")) {
    if (isDev) {
      return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
      });
    }

    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    console.error("ERROR 💥", err);
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }

  if (isDev) {
    console.error("ERROR 💥", err);
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }

  console.error("ERROR 💥", err);
  return res.status(500).render("error", {
    title: "Something went wrong!",
    msg: "Please try again later.",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const isDev = process.env.NODE_ENV === "development";
  let error = { ...err, message: err.message };

  error = handleDBErrors(error);
  error = handleJWTErrors(error);

  sendError(error, req, res, isDev);
};
