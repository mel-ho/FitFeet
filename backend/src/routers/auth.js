const express = require("express");
const router = express.Router();

// const checkValid = require("../middleware/checkValid");
// const {
//   validateRegistrationData,
//   validateLoginData,
//   validateRefreshData,
//   validateResetPassworddata,
// } = require("../validators/auth");

const { registerUser, loginUser, refresh } = require("../controllers/auth");

router.put("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refresh);

module.exports = router;
