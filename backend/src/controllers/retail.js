// retailers + orders + products

const pool = require("../db");

// GET all retailers
const getAllRetailers = async (req, res) => {
  try {
    const query = `
      SELECT u.id AS user_id,
        u.email AS user_email,
        r.id AS retailer_id,
        r.name AS retailer_name,
        r.contact_detail AS retailer_contact_detail,
        r.contact_address AS retailer_contact_address
      FROM users u
      JOIN retailers r ON u.retailer_id = r.id
      WHERE u.is_retailer = TRUE
    `;

    const allRetailers = await pool.query(query);
    res.json(allRetailers.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// GET retailer By ID
const getRetailerById = async (req, res) => {
  try {
    const retailerId = req.params.retailerId;
    const query = `
      SELECT u.id AS user_id,
        u.email AS user_email,
        r.id AS retailer_id,
        r.name AS retailer_name,
        r.contact_detail AS retailer_contact_detail,
        r.contact_address AS retailer_contact_address
      FROM users u
      JOIN retailers r ON u.retailer_id = r.id
      WHERE r.id = $1
        AND u.is_retailer = TRUE
    `;
    const retailer = await pool.query(query, [retailerId]);
    if (retailer.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", msg: "Retailer not found" });
    }
    res.json(retailer.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// UPDATE retailer details By ID
const patchRetailer = async (req, res) => {};

module.exports = {
  getAllRetailers,
  getRetailerById,
  patchRetailer,
};
