const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_SECRET);
  } catch (error) {
    return null;
  }
};

const authUser = (req, res, next) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");
  const decoded = verifyToken(token);

  if (decoded) {
    req.decoded = decoded;
    next();
  } else {
    return res.status(401).json({ status: "error", msg: "unauthorized" });
  }
};

const authRetailer = (req, res, next) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");
  const decoded = verifyToken(token);

  if (decoded && (decoded.is_retailer || decoded.is_admin)) {
    req.decoded = decoded;
    next();
  } else {
    return res.status(401).json({ status: "error", msg: "unauthorized" });
  }
};

const authAdmin = (req, res, next) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");
  const decoded = verifyToken(token);

  if (decoded && decoded.is_admin) {
    req.decoded = decoded;
    next();
  } else {
    return res.status(401).json({ status: "error", msg: "unauthorized" });
  }
};

module.exports = { authUser, authRetailer, authAdmin };
