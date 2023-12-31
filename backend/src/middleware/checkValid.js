const { validationResult } = require("express-validator");

const checkValid = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

module.exports = checkValid;
