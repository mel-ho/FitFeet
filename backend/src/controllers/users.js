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

// GET user By userId
const getUserById = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const query = `
      SELECT * FROM users
      WHERE user_id = $1
    `;
    const user = await pool.query(query, [user_id]);
    if (user.rows.length === 0) {
      return res.status(404).json({ status: "error", msg: "User not found" });
    }
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// UPDATE user login related details By userId
const patchUser = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const { email, is_retailer, retailer_id, is_admin, is_active } = req.body;
    const query = `
      UPDATE users
      SET email = $1,
          is_retailer = $2,
          retailer_id = $3,
          is_admin = $4,
          is_active = $5
      WHERE user_id = $6
    `;
    const values = [
      email,
      is_retailer,
      retailer_id,
      is_admin,
      is_active,
      user_id,
    ];
    await pool.query(query, values);
    res.json({ status: "success", msg: "User details updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// add user climbing exerience by userId
const addUserClimbingExperience = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const { sport_climbing, bouldering, trad_climbing, years_exp } = req.body;

    const query = `
      INSERT INTO user_climbingexp (user_id, sport_climbing, bouldering, trad_climbing, years_exp)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const values = [
      user_id,
      sport_climbing,
      bouldering,
      trad_climbing,
      years_exp,
    ];
    await pool.query(query, values);

    res.json({
      status: "success",
      msg: "User climbing experience added",
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        status: "error",
        msg: "User climbing experience already exists",
      });
    }
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// add feet dimension by userId
const addUserFeetDimensions = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const {
      foot_length_l,
      foot_length_r,
      foot_width_l,
      foot_width_r,
      toe_length_l,
      toe_length_r,
      small_perim_l,
      small_perim_r,
      big_perim_l,
      big_perim_r,
      heel_perim_l,
      heel_perim_r,
    } = req.body;
    console.log("req.body", req.body);
    const query = `
      INSERT INTO user_feet (user_id, foot_length_l, foot_length_r, foot_width_l, foot_width_r,
        toe_length_l, toe_length_r, small_perim_l, small_perim_r, big_perim_l, big_perim_r,
        heel_perim_l, heel_perim_r)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;

    const values = [
      user_id,
      foot_length_l,
      foot_length_r,
      foot_width_l,
      foot_width_r,
      toe_length_l,
      toe_length_r,
      small_perim_l,
      small_perim_r,
      big_perim_l,
      big_perim_r,
      heel_perim_l,
      heel_perim_r,
    ];
    await pool.query(query, values);

    res.json({ status: "success", msg: "User feet dimensions added" });
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ status: "error", msg: "User feet dimensions already exists" });
    }
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// add user_address by userId
const addUserAddress = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const { shipping_address } = req.body;

    const query = `
      INSERT INTO user_address (user_id, shipping_address)
      VALUES ($1, $2 )
    `;

    const values = [user_id, shipping_address];
    await pool.query(query, values);

    res.json({
      status: "success",
      msg: "User shipping address added",
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        status: "error",
        msg: "User shipping address already exists",
      });
    }
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// get user climbing experience by userId
const getUserClimbingExperience = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const query = `
      SELECT * FROM user_climbingexp
      WHERE user_id = $1
    `;
    const climbingExp = await pool.query(query, [user_id]);
    if (climbingExp.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", msg: "Climbing experience not found" });
    }
    res.json(climbingExp.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// get feet dimension by userId
const getUserFeetDimensions = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const query = `
      SELECT * FROM user_feet
      WHERE user_id = $1
    `;
    const feetDimensions = await pool.query(query, [user_id]);
    if (feetDimensions.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", msg: "Feet dimensions not found" });
    }
    res.json(feetDimensions.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// get user_address by UserId
const getUserAddress = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const query = `
      SELECT * FROM user_address
      WHERE user_id = $1
    `;
    const address = await pool.query(query, [user_id]);
    if (address.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", msg: "Address not found" });
    }
    res.json(address.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// update user climbing experience by userId
const updateUserClimbingExperience = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const { sport_climbing, bouldering, trad_climbing, years_exp } = req.body;

    // Check if the user_id exists in the user_climbingexp table
    const userExistsQuery = `
      SELECT *
      FROM user_climbingexp
      WHERE user_id = $1
    `;
    const userExistsResult = await pool.query(userExistsQuery, [user_id]);

    if (userExistsResult.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", msg: "User climbing experience not found" });
    }

    const query = `
      UPDATE user_climbingexp
      SET sport_climbing = $1, bouldering = $2, trad_climbing = $3, years_exp = $4
      WHERE user_id = $5
    `;

    const values = [
      sport_climbing,
      bouldering,
      trad_climbing,
      years_exp,
      user_id,
    ];
    await pool.query(query, values);

    res.json({ status: "success", msg: "User climbing experience updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// update feet dimension by userId
const updateUserFeetDimensions = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const {
      foot_length_l,
      foot_length_r,
      foot_width_l,
      foot_width_r,
      toe_length_l,
      toe_length_r,
      small_perim_l,
      small_perim_r,
      big_perim_l,
      big_perim_r,
      heel_perim_l,
      heel_perim_r,
    } = req.body;

    // Check if the user_id exists in the user_feet table
    const userExistsQuery = `
      SELECT 1
      FROM user_feet
      WHERE user_id = $1
    `;
    const userExistsResult = await pool.query(userExistsQuery, [user_id]);

    if (userExistsResult.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", msg: "User feet dimensions not found" });
    }

    const query = `
      UPDATE user_feet
      SET foot_length_l = $1, foot_length_r = $2, foot_width_l = $3, foot_width_r = $4,
          toe_length_l = $5, toe_length_r = $6, small_perim_l = $7, small_perim_r = $8,
          big_perim_l = $9, big_perim_r = $10, heel_perim_l = $11, heel_perim_r = $12, user_id = $13
      WHERE user_id = $13
    `;

    const values = [
      foot_length_l,
      foot_length_r,
      foot_width_l,
      foot_width_r,
      toe_length_l,
      toe_length_r,
      small_perim_l,
      small_perim_r,
      big_perim_l,
      big_perim_r,
      heel_perim_l,
      heel_perim_r,
      user_id,
    ];
    await pool.query(query, values);

    res.json({ status: "success", msg: "User feet dimensions updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// update user_address by userId
const updateUserAddress = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const { shipping_address } = req.body;

    // Check if the user_id exists in the user_address table
    const userExistsQuery = `
      SELECT 1
      FROM user_address
      WHERE user_id = $1
    `;
    const userExistsResult = await pool.query(userExistsQuery, [user_id]);

    if (userExistsResult.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", msg: "User address not found" });
    }

    const query = `
      UPDATE user_address
      SET shipping_address = $1
      WHERE user_id = $2
    `;

    const values = [shipping_address, user_id];
    await pool.query(query, values);

    res.json({ status: "success", msg: "User address updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  patchUser,
  addUserClimbingExperience,
  addUserFeetDimensions,
  addUserAddress,
  getUserClimbingExperience,
  getUserFeetDimensions,
  getUserAddress,
  updateUserClimbingExperience,
  updateUserFeetDimensions,
  updateUserAddress,
};
