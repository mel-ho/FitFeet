// users + user_address + user_feet + user_climbingexp

const pool = require("../db");

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// GET user By ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const query = `
      SELECT * FROM users
      WHERE id = $1
    `;
    const user = await pool.query(query, [userId]);
    if (user.rows.length === 0) {
      return res.status(404).json({ status: "error", msg: "User not found" });
    }
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// UPDATE user login related details By ID
const patchUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { email, password, is_retailer, retailerId, is_admin, is_active } =
      req.body;
    const query = `
      UPDATE users
      SET email = $1,
          password = $2,
          is_retailer = $3,
          retailer_id = $4,
          is_admin = $5,
          is_active = $6
      WHERE id = $7
    `;
    const values = [
      email,
      password,
      is_retailer,
      retailerId,
      is_admin,
      is_active,
      userId,
    ];
    await pool.query(query, values);
    res.json({ status: "success", msg: "User details updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// GET all shoe data

module.exports = {
  getAllUsers,
  getUserById,
  patchUser,
};
