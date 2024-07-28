const express = require("express");
const weatherController = require("../controllers/weatherController");

const router = express.Router();

router.get("/forecast", weatherController.getWeatherForecast);
router.get("/locations", weatherController.getLocations);

module.exports = router;
