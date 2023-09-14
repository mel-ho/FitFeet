// retailers + orders + products
const { v4: uuidv4 } = require("uuid");
const pool = require("../db");

// GET all retailers
const getAllRetailers = async (req, res) => {
  try {
    const query = `
      SELECT u.user_id AS user_id,
        u.email AS email,
        r.retailer_id AS retailer_id,
        r.name AS retailer_name,
        r.contact_detail AS retailer_contact_detail,
        r.contact_address AS retailer_contact_address
      FROM users u
      JOIN retailers r ON u.retailer_id = r.retailer_id
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
    const retailer_id = req.params.retailerId;
    const query = `
      SELECT u.user_id AS user_id,
        u.email AS email,
        r.retailer_id AS retailer_id,
        r.name AS name,
        r.contact_detail AS contact_detail,
        r.contact_address AS contact_address
      FROM users u
      JOIN retailers r ON u.retailer_id = r.retailer_id
      WHERE r.retailer_id = $1
        AND u.is_retailer = TRUE
    `;
    const retailer = await pool.query(query, [retailer_id]);
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

const patchRetailerByRetailerId = async (req, res) => {
  try {
    const retailer_id = req.params.retailerId;
    const { name, contact_detail, contact_address } = req.body;

    // Check if retailer_id already exists in the database
    const checkQuery = `
      SELECT * FROM retailers WHERE retailer_id = $1
    `;

    const checkResult = await pool.query(checkQuery, [retailer_id]);

    if (checkResult.rowCount === 0) {
      // If retailer_id does not exist, INSERT new row
      const insertQuery = `
        INSERT INTO retailers (retailer_id, name, contact_detail, contact_address)
        VALUES ($1, $2, $3, $4)
      `;

      const values = [retailer_id, name, contact_detail, contact_address];
      await pool.query(insertQuery, values);

      res.json({ status: "success", msg: "New retailer added" });
    } else {
      // If retailer_id exists, UPDATE the existing row
      const updateQuery = `
        UPDATE retailers
        SET name = $1, contact_detail = $2, contact_address = $3
        WHERE retailer_id = $4
      `;

      const values = [name, contact_detail, contact_address, retailer_id];
      await pool.query(updateQuery, values);

      res.json({ status: "success", msg: "Retailer details updated" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

const addNewProduct = async (req, res) => {
  try {
    const {
      retailer_id,
      brand,
      model,
      size_country,
      size_number,
      date_purchased,
      quantity,
    } = req.body;

    // Initial query to get size_id based on size_country and size_number
    let getSizeIdQuery = `
      SELECT size_id FROM sizes 
      WHERE size_country = $1 AND size_number = $2
    `;

    const sizeResult = await pool.query(getSizeIdQuery, [
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

    // Query to get shoe_id based on brand, model, and size_id
    let getShoeIdQuery = `
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

    // Insert the new product entry
    const query = `
      INSERT INTO products (retailer_id, shoe_id, date_purchased, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING product_id
    `;
    const values = [retailer_id, shoe_id, date_purchased, quantity];
    const newProduct = await pool.query(query, values);

    res.json({
      status: "success",
      msg: "New product added",
      product_id: newProduct.rows[0].product_id,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

const getAllProductsByRetailerId = async (req, res) => {
  try {
    const retailer_id = req.params.retailerId;
    const query = `
      SELECT p.product_id AS product_id,
             p.date_purchased,
             p.quantity AS product_quantity,
             b.brand,
             m.model,
             sz.size_country,
             sz.size_number
      FROM products p
      JOIN retailers r ON p.retailer_id = r.retailer_id
      JOIN shoes sh ON p.shoe_id = sh.shoe_id
      JOIN brands b ON sh.brand = b.brand
      JOIN models m ON sh.model = m.model
      JOIN sizes sz ON sh.size_id = sz.size_id
      WHERE r.retailer_id = $1
    `;
    const products = await pool.query(query, [retailer_id]);
    res.json(products.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// GET product by productID
const getProductByProductId = async (req, res) => {
  try {
    const product_id = req.params.productId;
    const query = `
      SELECT p.product_id AS product_id,
        p.shoe_id,
        p.date_purchased,
        p.quantity AS product_quantity,
        r.retailer_id AS retailer_id,
        r.name AS retailer_name
      FROM products p
      JOIN retailers r ON p.retailer_id = r.retailer_id
      WHERE p.product_id = $1
    `;
    const product = await pool.query(query, [product_id]);

    // Check if a product with the specified ID exists
    if (product.rows.length === 0) {
      return res
        .status(404)
        .json({ status: "error", msg: "Product not found" });
    }

    res.json(product.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", msg: error.message });
  }
};

// UPDATE product quantity by product ID
const updateProductQuantitybyProductId = async (req, res) => {
  try {
    const product_id = req.params.productId;
    const { quantity } = req.body;
    const query = `
      UPDATE products
      SET quantity = $1
      WHERE product_id = $2
    `;
    const values = [quantity, product_id];
    await pool.query(query, values);

    res.json({ status: "success", msg: "Product quantity updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// ADD  new order
const addNewOrder = async (req, res) => {
  const client = await pool.connect();

  try {
    const { retailer_id, user_id, product_id, quantity } = req.body;

    const defaultOrderDate = new Date().toISOString().substring(0, 10); // Use the current date
    const defaultOrderStatus = "ordered";

    // Start a transaction
    await client.query("BEGIN");

    // Insert the new order
    const insertOrderQuery = `
      INSERT INTO orders (retailer_id, user_id, product_id, quantity, order_date, order_status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING order_id
    `;
    const orderValues = [
      retailer_id,
      user_id,
      product_id,
      quantity,
      defaultOrderDate,
      defaultOrderStatus,
    ];

    const newOrder = await client.query(insertOrderQuery, orderValues);
    const order_id = newOrder.rows[0].order_id;

    // Update the product quantity in the products table
    const updateProductQuantityQuery = `
      UPDATE products
      SET quantity = quantity - $1
      WHERE product_id = $2
    `;
    const updateValues = [quantity, product_id];
    await client.query(updateProductQuantityQuery, updateValues);

    // Commit the transaction
    await client.query("COMMIT");

    res.json({
      status: "success",
      msg: "New order added",
      order_id: order_id,
    });
  } catch (error) {
    // If an error occurs, roll back the transaction
    await client.query("ROLLBACK");
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  } finally {
    // Release the client back to the pool
    client.release();
  }
};

// GET all orders by retailer ID
const getAllOrdersByRetailerId = async (req, res) => {
  try {
    const retailer_id = req.params.retailerId;
    const query = `
    SELECT 
    o.order_id,
    p.product_id,
    o.user_id,
    s.brand,
    s.model,
    sz.size_number,
    sz.size_country,
    o.quantity AS order_quantity,
    o.order_date,
    o.order_status,
    ua.shipping_address
  FROM orders o
  LEFT JOIN products p ON o.product_id = p.product_id
  LEFT JOIN shoes s ON p.shoe_id = s.shoe_id
  LEFT JOIN sizes sz ON s.size_id = sz.size_id
  LEFT JOIN user_address ua ON o.user_id = ua.user_id
  WHERE p.retailer_id = $1
    `;
    const orders = await pool.query(query, [retailer_id]);
    res.json(orders.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// GET order by userId
const getOrderByUserId = async (req, res) => {
  try {
    const user_id = req.params.userId;

    const query = `
      SELECT 
        o.order_id,
        s.brand,  -- display brand
        s.model,  -- display model
        r.name AS retailer_name,  -- display retailer name
        o.order_date,  -- display order date
        o.order_status,  -- display order status
        m.img_link
      FROM orders o
      JOIN products p ON o.product_id = p.product_id
      JOIN shoes s ON p.shoe_id = s.shoe_id
      JOIN models m ON s.model = m.model
      JOIN retailers r ON p.retailer_id = r.retailer_id  -- Join with the retailers table to get the retailer name
      WHERE o.user_id = $1;

    `;
    const order = await pool.query(query, [user_id]);

    // Check if an order with the specified ID exists
    if (order.rows.length === 0) {
      return res.status(404).json({ status: "error", msg: "Order not found" });
    }

    res.json(order.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", msg: error.message });
  }
};

// GET order status
const getOrderStatus = async (req, res) => {
  try {
    const query = `
      SELECT * FROM order_status
    `;
    const order_status = await pool.query(query);
    res.json(order_status.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// UPDATE order_status by order ID
const updateOrderStatusByOrderId = async (req, res) => {
  try {
    const order_id = req.params.orderId;
    const { order_status } = req.body;
    const query = `
      UPDATE orders
      SET order_status = $1
      WHERE order_id = $2
    `;
    const values = [order_status, order_id];
    await pool.query(query, values);

    res.json({ status: "success", msg: "Order status updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

module.exports = {
  getAllRetailers,
  getRetailerById,
  patchRetailerByRetailerId,
  addNewProduct,
  getAllProductsByRetailerId,
  getProductByProductId,
  updateProductQuantitybyProductId,
  addNewOrder,
  getAllOrdersByRetailerId,
  getOrderByUserId,
  getOrderStatus,
  updateOrderStatusByOrderId,
};
