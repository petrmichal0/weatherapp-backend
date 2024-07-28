const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.get("/currentUser", authController.isLoggedIn, userController.getUser);
router.get("/:city", authController.isLoggedIn, userController.getCity);
router.post(
  "/favorites",
  authController.isLoggedIn,
  userController.addFavoriteCity
);
router.delete(
  "/favorites",
  authController.isLoggedIn,
  userController.removeFavoriteCity
);

module.exports = router;
