const express = require("express");
const router = express.Router();

const checkValid = require("../middleware/checkValid");
const {
  validateRegistrationData,
  validateLoginData,
  validateRefreshData,
} = require("../validators/auth");

const { registerUser, loginUser, refresh } = require("../controllers/auth");

router.put("/register", validateRegistrationData, checkValid, registerUser);
router.post("/login", validateLoginData, checkValid, loginUser);
router.post("/refresh", validateRefreshData, checkValid, refresh);

module.exports = router;
