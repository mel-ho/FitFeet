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

// UPDATE user login related details By userId
const patchUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { email, is_retailer, retailer_id, is_admin, is_active } = req.body;
    const query = `
      UPDATE users
      SET email = $1,
          is_retailer = $2,
          retailer_id = $3,
          is_admin = $4,
          is_active = $5
      WHERE id = $6
    `;
    const values = [
      email,
      is_retailer,
      retailer_id,
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

// add user climbing exerience by userId
const addUserClimbingExperience = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { sportClimbing, bouldering, tradClimbing, yearsOfExperience } =
      req.body;

    const query = `
      INSERT INTO users_climbingexp (user_id, sport_climbing, bouldering, trad_climbing, years_exp)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const values = [
      userId,
      sportClimbing,
      bouldering,
      tradClimbing,
      yearsOfExperience,
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
    const userId = req.params.userId;
    const {
      footLengthL,
      footLengthR,
      footWidthL,
      footWidthR,
      toeLengthL,
      toeLengthR,
      smallPerimL,
      smallPerimR,
      bigPerimL,
      bigPerimR,
      heelPerimL,
      heelPerimR,
    } = req.body;

    const query = `
      INSERT INTO user_feet (user_id, foot_length_L, foot_length_R, foot_width_L, foot_width_R,
        toe_length_L, toe_length_R, small_perim_L, small_perim_R, big_perim_L, big_perim_R,
        heel_perim_L, heel_perim_R)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;

    const values = [
      userId,
      footLengthL,
      footLengthR,
      footWidthL,
      footWidthR,
      toeLengthL,
      toeLengthR,
      smallPerimL,
      smallPerimR,
      bigPerimL,
      bigPerimR,
      heelPerimL,
      heelPerimR,
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
    const userId = req.params.userId;
    const { shipping_address } = req.body;

    const query = `
      INSERT INTO user_address (user_id, shipping_address)
      VALUES ($1, $2 )
    `;

    const values = [userId, shipping_address];
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
    const userId = req.params.userId;
    const query = `
      SELECT * FROM users_climbingexp
      WHERE user_id = $1
    `;
    const climbingExp = await pool.query(query, [userId]);
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
    const userId = req.params.userId;
    const query = `
      SELECT * FROM user_feet
      WHERE user_id = $1
    `;
    const feetDimensions = await pool.query(query, [userId]);
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
    const userId = req.params.userId;
    const query = `
      SELECT * FROM user_address
      WHERE user_id = $1
    `;
    const address = await pool.query(query, [userId]);
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
    const userId = req.params.userId;
    const { sport_climbing, bouldering, trad_climbing, years_exp } = req.body;

    // Check if the userId exists in the users_climbingexp table
    const userExistsQuery = `
      SELECT *
      FROM users_climbingexp
      WHERE user_id = $1
    `;
    const userExistsResult = await pool.query(userExistsQuery, [userId]);

    if (userExistsResult.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", msg: "User climbing experience not found" });
    }

    const query = `
      UPDATE users_climbingexp
      SET sport_climbing = $1, bouldering = $2, trad_climbing = $3, years_exp = $4
      WHERE user_id = $5
    `;

    const values = [
      sport_climbing,
      bouldering,
      trad_climbing,
      years_exp,
      userId,
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
    const userId = req.params.userId;
    const {
      footLengthL,
      footLengthR,
      footWidthL,
      footWidthR,
      toeLengthL,
      toeLengthR,
      smallPerimL,
      smallPerimR,
      bigPerimL,
      bigPerimR,
      heelPerimL,
      heelPerimR,
    } = req.body;

    // Check if the userId exists in the user_feet table
    const userExistsQuery = `
      SELECT 1
      FROM user_feet
      WHERE user_id = $1
    `;
    const userExistsResult = await pool.query(userExistsQuery, [userId]);

    if (userExistsResult.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", msg: "User feet dimensions not found" });
    }

    const query = `
      UPDATE user_feet
      SET foot_length_L = $1, foot_length_R = $2, foot_width_L = $3, foot_width_R = $4,
          toe_length_L = $5, toe_length_R = $6, small_perim_L = $7, small_perim_R = $8,
          big_perim_L = $9, big_perim_R = $10, heel_perim_L = $11, heel_perim_R = $12
      WHERE user_id = $13
    `;

    const values = [
      footLengthL,
      footLengthR,
      footWidthL,
      footWidthR,
      toeLengthL,
      toeLengthR,
      smallPerimL,
      smallPerimR,
      bigPerimL,
      bigPerimR,
      heelPerimL,
      heelPerimR,
      userId,
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
    const userId = req.params.userId;
    const { shipping_address } = req.body;

    // Check if the userId exists in the user_address table
    const userExistsQuery = `
      SELECT 1
      FROM user_address
      WHERE user_id = $1
    `;
    const userExistsResult = await pool.query(userExistsQuery, [userId]);

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

    const values = [shipping_address, userId];
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
