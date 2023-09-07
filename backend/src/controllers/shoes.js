// brands + shoes + user_shoes
const pool = require("../db");

// Add a new brand
const addBrand = async (req, res) => {
  try {
    const { brandname } = req.body;
    const query = `
      INSERT INTO brands (brandname)
      VALUES ($1)
      RETURNING id
    `;
    const values = [brandname];
    const newBrand = await pool.query(query, values);

    res.json({
      status: "success",
      msg: "New brand added",
      brandId: newBrand.rows[0].id,
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

// Add a new brand model
const addBrandModel = async (req, res) => {
  try {
    const { brandId, modelName } = req.body;
    const query = `
      INSERT INTO models (brand_id, model)
      VALUES ($1, $2)
      RETURNING id
    `;
    const values = [brandId, modelName];
    const newBrandModel = await pool.query(query, values);

    res.json({
      status: "success",
      msg: "New brand model added",
      brandModelId: newBrandModel.rows[0].id,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// Get all brand models
const getAllBrandModels = async (req, res) => {
  try {
    const query = `
    SELECT b.brandname AS brand_name, m.model
    FROM models m
    JOIN brands b ON m.brand_id = b.id
  `;
    const brandModels = await pool.query(query);
    res.json(brandModels.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// Add a new size
const addSize = async (req, res) => {
  try {
    const { size_us } = req.body;
    const query = `
      INSERT INTO sizes (size_us)
      VALUES ($1)
      RETURNING id
    `;
    const values = [size_us];
    const newSize = await pool.query(query, values);

    res.json({
      status: "success",
      msg: "New size added",
      sizeId: newSize.rows[0].id,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
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

// Add a new pair of shoes by on model and size
const addShoes = async (req, res) => {
  try {
    const { model, size_us } = req.body;

    // Retrieve the model_id based on the provided model
    const getModelIdQuery = `
        SELECT id FROM models WHERE model = $1
      `;
    const modelResult = await pool.query(getModelIdQuery, [model]);

    if (modelResult.rows.length === 0) {
      return res.status(404).json({ status: "error", msg: "Model not found" });
    }

    const model_id = modelResult.rows[0].id;

    // Retrieve the size_id based on the provided size_us
    const getSizeIdQuery = `
        SELECT id FROM sizes WHERE size_us = $1
      `;
    const sizeResult = await pool.query(getSizeIdQuery, [size_us]);

    if (sizeResult.rows.length === 0) {
      return res.status(404).json({ status: "error", msg: "Size not found" });
    }

    const size_id = sizeResult.rows[0].id;

    // Insert the new pair of shoes with the retrieved model_id and size_id
    const insertShoesQuery = `
        INSERT INTO shoes (model_id, size_id)
        VALUES ($1, $2)
        RETURNING id
      `;
    const values = [model_id, size_id];
    const newShoes = await pool.query(insertShoesQuery, values);

    res.json({
      status: "success",
      msg: "New pair of shoes added",
      shoesId: newShoes.rows[0].id,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
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
    const shoeId = req.params.shoeId;
    const query = `
      SELECT * FROM shoes
      WHERE id = $1
    `;
    const shoe = await pool.query(query, [shoeId]);

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

// Add a new pair of user shoes
const addUserShoes = async (req, res) => {
  try {
    const {
      shoeId,
      datePurchased,
      dateWorn,
      dateDisposed,
      starRating,
      userId,
    } = req.body;
    const query = `
      INSERT INTO user_shoes (shoe_id, date_purchased, date_worn, date_disposed, star_rating, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [
      shoeId,
      datePurchased,
      dateWorn,
      dateDisposed,
      starRating,
      userId,
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
    const userId = req.params.userId;
    const query = `
      SELECT * FROM user_shoes
      WHERE user_id = $1
    `;
    const userShoes = await pool.query(query, [userId]);
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
  addBrandModel,
  getAllBrandModels,
  addSize,
  getAllSizes,
  addShoes,
  getAllShoes,
  getShoeByShoeId,
  addUserShoes,
  getAllUserShoes,
  getUserShoesByUserId,
  getUserShoeByUsershoeId,
};
