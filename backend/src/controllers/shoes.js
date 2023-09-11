// brands + shoes + user_shoes
const pool = require("../db");

// Add a new brand
const addBrand = async (req, res) => {
  try {
    const { brand } = req.body;
    const query = `
      INSERT INTO brands (brand)
      VALUES ($1)
      RETURNING brand
    `;
    const values = [brand];
    const newBrand = await pool.query(query, values);

    res.json({
      status: "success",
      msg: "New brand added",
      brand: newBrand.rows[0].brand,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// Get all brands
const getAllBrands = async (req, res) => {
  try {
    const query = `
      SELECT * FROM brands
    `;
    const brands = await pool.query(query);
    res.json(brands.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// Add a new model
const addModel = async (req, res) => {
  try {
    const { model } = req.body;

    // Insert the new model into the models table
    const insertQuery = `
      INSERT INTO models (model)
      VALUES ($1)
      RETURNING model
    `;
    const insertValues = [model];
    const newModel = await pool.query(insertQuery, insertValues);

    res.status(201).json({
      status: "success",
      msg: "New model added",
      model: newModel.rows[0].model,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: error.message });
  }
};

// Get all models
const getAllModels = async (req, res) => {
  try {
    const query = `
    SELECT * FROM models
  `;
    const models = await pool.query(query);
    res.json(models.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// Get models by brand
const getModelsByBrand = async (req, res) => {
  try {
    const { brand } = req.params;
    const query = `
    SELECT * FROM models
    WHERE BRAND`;
  } catch (error) {}
};

// Get all size_countries
const getAllCountries = async (req, res) => {
  try {
    const query = `
    SELECT * FROM size_countries
  `;
    const countries = await pool.query(query);
    res.json(countries.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// Add a new size
const addSize = async (req, res) => {
  try {
    const { size_country, size_number } = req.body;

    // Insert the new size into the 'sizes' table
    const insertQuery = `
      INSERT INTO sizes (size_country, size_number)
      VALUES ($1, $2)
    `;
    const insertValues = [size_country, size_number];
    await pool.query(insertQuery, insertValues);

    res.json({
      status: "success",
      msg: "New size added",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: error.message });
  }
};

// Get all sizes
const getAllSizes = async (req, res) => {
  try {
    const query = `
      SELECT * FROM sizes
    `;
    const sizes = await pool.query(query);
    res.json(sizes.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// Get sizes by size_country
const getSizesbyCountry = async (req, res) => {
  try {
    const size_country = req.params.country;
    console.log(size_country);

    // Query to select size_numbers based on size_country
    const query = `
      SELECT size_number
      FROM sizes
      WHERE size_country = $1
    `;

    const sizes = await pool.query(query, [size_country]);

    if (sizes.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        msg: "No sizes found for the specified country",
      });
    }

    const sizeNumbers = sizes.rows.map((row) => row.size_number);

    res.json(sizeNumbers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", msg: error.message });
  }
};

// Add a new pair of shoes by brand, model, and size
const addShoes = async (req, res) => {
  try {
    const { brand, model, size_id } = req.body;

    // Insert the new pair of shoes into the 'shoes' table
    const insertShoesQuery = `
      INSERT INTO shoes (brand, model, size_id)
      VALUES ($1, $2, $3)
    `;
    const values = [brand, model, size_id];
    await pool.query(insertShoesQuery, values);

    res.json({
      status: "success",
      msg: "New pair of shoes added",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: error.message });
  }
};

// Get all shoes
const getAllShoes = async (req, res) => {
  try {
    const query = `
      SELECT * FROM shoes
    `;
    const shoes = await pool.query(query);
    res.json(shoes.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// Get shoe by shoe ID
const getShoeByShoeId = async (req, res) => {
  try {
    const shoe_id = req.params.shoeId;
    const query = `
      SELECT * FROM shoes
      WHERE shoe_id = $1
    `;
    const shoe = await pool.query(query, [shoe_id]);

    // Check if a shoe with the specified ID exists
    if (shoe.rows.length === 0) {
      return res.status(404).json({ status: "error", msg: "Shoe not found" });
    }

    res.json(shoe.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", msg: error.message });
  }
};

// Get shoes by brand
const getShoesByBrand = async (req, res) => {
  try {
    const brand = req.params.brand; // Assuming the brand is in the URL parameter

    // Query to retrieve shoes by brand
    const query = `
      SELECT * FROM shoes
      WHERE brand = $1
    `;
    const shoes = await pool.query(query, [brand]);

    // Check if any shoes with the specified brand exist
    if (shoes.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", msg: "No shoes found for this brand" });
    }

    res.json(shoes.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
};

// Add a new pair of user shoes
const addUserShoes = async (req, res) => {
  try {
    const {
      shoe_id,
      datePurchased,
      dateWorn,
      dateDisposed,
      starRating,
      user_id,
    } = req.body;
    const query = `
      INSERT INTO user_shoes (shoe_id, date_purchased, date_worn, date_disposed, star_rating, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [
      shoe_id,
      datePurchased,
      dateWorn,
      dateDisposed,
      starRating,
      user_id,
    ];
    await pool.query(query, values);

    res.json({
      status: "success",
      msg: "New pair of user shoes added",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// Get all user shoes
const getAllUserShoes = async (req, res) => {
  try {
    const query = `
      SELECT * FROM user_shoes
    `;
    const userShoes = await pool.query(query);
    res.json(userShoes.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// Get all user shoes by user ID
const getUserShoesByUserId = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const query = `
      SELECT * FROM user_shoes
      WHERE user_id = $1
    `;
    const userShoes = await pool.query(query, [user_id]);
    res.json(userShoes.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// Get a specific user shoes by usershoe ID
const getUserShoeByUsershoeId = async (req, res) => {
  try {
    const user_shoe_id = req.params.usershoeId;
    const query = `
        SELECT * FROM user_shoes
        WHERE user_shoe_id = $1
      `;
    const userShoes = await pool.query(query, [user_shoe_id]);
    res.json(userShoes.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

module.exports = {
  addBrand,
  getAllBrands,
  addModel,
  getAllModels,
  getAllCountries,
  addSize,
  getAllSizes,
  getSizesbyCountry,
  addShoes,
  getAllShoes,
  getShoeByShoeId,
  getShoesByBrand,
  addUserShoes,
  getAllUserShoes,
  getUserShoesByUserId,
  getUserShoeByUsershoeId,
};
