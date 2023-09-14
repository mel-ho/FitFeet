const { body } = require("express-validator");

const validateRegistrationData = [
  body("email", "email is required").not().isEmpty(),
  body("email", "valid email is required").isEmail(),
  body("password", "password is invalid").not().isEmpty().isLength({
    min: 6,
    max: 24,
  }),
  body("isActive", "isActive is required").not().isEmpty(),
  body("isStaff", "isStaff is required").not().isEmpty(),
  // body("staffRank", "staffRank is required").not().isEmpty(),
  body("isMember", "isMember is required").not().isEmpty(),
  // body("memberRank", "memberRank is required").not().isEmpty(),
];

const validateLoginData = [
  body("email", "email is required").not().isEmpty().isEmail(),
  body("password", "password is required").not().isEmpty(),
];

const validateRefreshData = [
  body("refresh", "refresh token is invalid")
    .not()
    .isEmpty()
    .isLength({ min: 1 }),
];

module.exports = {
  validateRegistrationData,
  validateLoginData,
  validateRefreshData,
};
