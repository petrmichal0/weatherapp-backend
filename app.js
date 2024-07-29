const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const weatherRouter = require("./routes/weatherRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const path = require("path");

const app = express();

// Povolit CORS pro všechny požadavky
// app.use(cors());

const corsOptions = {
  origin: "https://my-weatherapp-frontend-9e993cefb36f.herokuapp.com",
  credentials: true,
};

app.use(cors(corsOptions));

app.options("*", cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend/dist")));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/weather", weatherRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
