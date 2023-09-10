const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email is already registered
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ status: "error", msg: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user_id = uuidv4();

    await pool.query(
      "INSERT INTO users (user_id, email, password, is_active) VALUES ($1, $2, $3, $4)",
      [user_id, email, hashedPassword, true]
    );

    res.json({ status: "success", msg: "User registration successful" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", msg: "Invalid user registration" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // insert sql code to find get user by email address

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      console.log("User not found");
      return res.status(400).json({ status: "error", msg: "User not found" });
    }

    const userData = user.rows[0];

    if (!userData.is_active) {
      console.log("User account is inactive.");
      return res.status(401).json({
        status: "error",
        msg: "User account blocked. Contact admin for help",
      });
    }

    const passwordCheck = await bcrypt.compare(password, userData.password);

    if (!passwordCheck) {
      console.log("Email or password error");
      return res.status(401).json({ status: "error", msg: "Login failed" });
    }

    const claims = {
      user_id: userData.user_id,
      email: userData.email,
      is_active: userData.is_active,
      is_retailer: userData.is_retailer,
      retailer_id: userData.retailer_id,
      is_admin: userData.is_admin,
    };

    const accessToken = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refreshToken = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "230d",
      jwtid: uuidv4(),
    });

    res.json({ access: accessToken, refresh: refreshToken });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", msg: "Login failed" });
  }
};

const refresh = (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = {
      user_id: decoded.user_id,
      email: decoded.email,
      is_active: decoded.is_active,
      is_retailer: decoded.is_retailer,
      retailer_id: decoded.retailer_id,
      is_admin: decoded.is_admin,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });
    res.json({ access });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ status: "error", msg: "token refresh error" });
  }
};

module.exports = { registerUser, loginUser, refresh };
