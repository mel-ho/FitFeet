// brands + shoes + user_shoes
const pool = require("../db");

// Add a new brand - admin & retailer interface
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

// Get all brands - admin & retailer interface
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

// Add a new model - admin & retailer interface
const addModel = async (req, res) => {
  try {
    const { model } = req.body;

    // Insert the new model into the models table
    const insertQuery = `
      INSERT INTO models (model, img_link)
      VALUES ($1, $2)
      RETURNING model
    `;
    const insertValues = [model, img_link];
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

// Get all models - admin interface
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

// Get all size_countries - admin interface
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

// Add a new size - admin & retailer interface
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

// Get all sizes - admin interface
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

// Get sizes by size_country - admin interface
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

// add new shoe. if existing size doesn't exists in size database, add that size too.
const addShoes = async (req, res) => {
  try {
    const { brand, model, size_country, size_number } = req.body;

    // Lookup size_id using size_country and size_number
    const sizeIdQuery = `
      SELECT size_id FROM sizes
      WHERE size_country = $1 AND size_number = $2
    `;
    const sizeResult = await pool.query(sizeIdQuery, [
      size_country,
      size_number,
    ]);

    let size_id;

    // If size_id is not found, insert a new size
    if (!sizeResult.rows[0]) {
      const insertSizeQuery = `
        INSERT INTO sizes (size_country, size_number)
        VALUES ($1, $2) RETURNING size_id
      `;
      const newSizeResult = await pool.query(insertSizeQuery, [
        size_country,
        size_number,
      ]);
      size_id = newSizeResult.rows[0].size_id;
    } else {
      size_id = sizeResult.rows[0].size_id;
    }

    // Insert the new pair of shoes into the 'shoes' table
    const insertShoesQuery = `
      INSERT INTO shoes (brand, model, size_id)
      VALUES ($1, $2, $3)
    `;
    await pool.query(insertShoesQuery, [brand, model, size_id]);

    res.json({
      status: "success",
      msg: "New pair of shoes added",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "error", msg: error.message });
  }
};

// get all shoes
const getAllShoes = async (req, res) => {
  try {
    const query = `
      SELECT shoes.*, sizes.size_country, sizes.size_number
      FROM shoes
      JOIN sizes ON shoes.size_id = sizes.size_id
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
      SELECT shoes.*, sizes.size_country, sizes.size_number
      FROM shoes
      JOIN sizes ON shoes.size_id = sizes.size_id
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

// PUT for user to add shoes - user interface
const addUserShoes = async (req, res) => {
  try {
    const {
      brand,
      model,
      size_country,
      size_number,
      date_purchased,
      date_worn,
      date_disposed,
      star_rating,
      user_id,
    } = req.body;

    // First, check if the size already exists
    const sizeIdQuery = `
      SELECT size_id FROM sizes
      WHERE size_country = $1 AND size_number = $2
    `;
    const sizeResult = await pool.query(sizeIdQuery, [
      size_country,
      size_number,
    ]);
    let size_id;

    // If size_id is not found, insert a new size
    if (!sizeResult.rows[0]) {
      const insertSizeQuery = `
        INSERT INTO sizes (size_country, size_number)
        VALUES ($1, $2) RETURNING size_id
      `;
      const newSizeResult = await pool.query(insertSizeQuery, [
        size_country,
        size_number,
      ]);
      size_id = newSizeResult.rows[0].size_id;
    } else {
      size_id = sizeResult.rows[0].size_id;
    }

    // Check if the shoe already exists
    const getShoeIdQuery = `
      SELECT sh.shoe_id FROM shoes sh
      INNER JOIN brands br ON sh.brand = br.brand
      INNER JOIN models md ON sh.model = md.model
      INNER JOIN sizes sz ON sh.size_id = sz.size_id
      WHERE br.brand = $1 AND md.model = $2 AND sz.size_id = $3
    `;
    const shoeIdResult = await pool.query(getShoeIdQuery, [
      brand,
      model,
      size_id,
    ]);
    let shoe_id;

    // If shoe_id is not found, insert a new shoe
    if (!shoeIdResult.rows[0]) {
      const insertShoeQuery = `
        INSERT INTO shoes (brand, model, size_id)
        VALUES ($1, $2, $3) RETURNING shoe_id
      `;
      const newShoeResult = await pool.query(insertShoeQuery, [
        brand,
        model,
        size_id,
      ]);
      shoe_id = newShoeResult.rows[0].shoe_id;
    } else {
      shoe_id = shoeIdResult.rows[0].shoe_id;
    }

    // Insert the new user_shoes entry
    const query = `
      INSERT INTO user_shoes (shoe_id, date_purchased, date_worn, date_disposed, star_rating, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [
      shoe_id,
      date_purchased,
      date_worn,
      date_disposed,
      star_rating,
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

// get all user shoes - not yet used
const getAllUserShoes = async (req, res) => {
  try {
    const query = `
      SELECT 
          us.user_shoe_id,
          us.date_purchased,
          us.date_worn,
          us.date_disposed,
          us.star_rating,
          us.user_id,
          sh.brand,
          sh.model,
          sz.size_country,
          sz.size_number
      FROM user_shoes us
      INNER JOIN shoes sh ON us.shoe_id = sh.shoe_id
      INNER JOIN sizes sz ON sh.size_id = sz.size_id
    `;

    const userShoes = await pool.query(query);
    res.json(userShoes.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// get user's shoes by userID -
const getUserShoesByUserId = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const query = `
      SELECT 
          us.user_shoe_id,
          us.date_purchased,
          us.date_worn,
          us.date_disposed,
          us.star_rating,
          us.user_id,
          sh.brand,
          sh.model,
          sz.size_country,
          sz.size_number
      FROM user_shoes us
      INNER JOIN shoes sh ON us.shoe_id = sh.shoe_id
      INNER JOIN sizes sz ON sh.size_id = sz.size_id
      WHERE us.user_id = $1
    `;
    const userShoes = await pool.query(query, [user_id]);
    res.json(userShoes.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

const getUserShoeByUsershoeId = async (req, res) => {
  try {
    const user_shoe_id = req.params.usershoeId;
    const query = `
      SELECT 
          us.user_shoe_id,
          us.date_purchased,
          us.date_worn,
          us.date_disposed,
          us.star_rating,
          us.user_id,
          sh.brand,
          sh.model,
          sz.size_country,
          sz.size_number
      FROM user_shoes us
      INNER JOIN shoes sh ON us.shoe_id = sh.shoe_id
      INNER JOIN sizes sz ON sh.size_id = sz.size_id
      WHERE us.user_shoe_id = $1
    `;
    const userShoe = await pool.query(query, [user_shoe_id]);
    res.json(userShoe.rows);
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
