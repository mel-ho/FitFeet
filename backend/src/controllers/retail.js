// retailers + orders + products
const { v4: uuidv4 } = require("uuid");
const pool = require("../db");

// Add a new retailer and update related information in the users table
const addNewRetailer = async (req, res) => {
  try {
    const { email, name, contact_detail, contact_address } = req.body;

    const client = await pool.connect();

    // start a database transaction
    await client.query("BEGIN");

    try {
      // Check if the provided email exists in the users table
      const checkUserQuery = `
        SELECT id, is_retailer FROM users WHERE email = $1
      `;
      const checkUserResult = await client.query(checkUserQuery, [email]);

      if (checkUserResult.rows.length === 0) {
        return res.status(404).json({ status: "error", msg: "User not found" });
      }

      const userId = checkUserResult.rows[0].id;
      const isRetailer = checkUserResult.rows[0].is_retailer;

      // If the user is already a retailer, return an error
      if (isRetailer) {
        return res
          .status(400)
          .json({ status: "error", msg: "User is already a retailer" });
      }

      // Insert the new retailer into the retailers table
      const retailerId = uuidv4(); // Generate a new UUID for the retailer
      const insertRetailerQuery = `
        INSERT INTO retailers (id, name, contact_detail, contact_address)
        VALUES ($1, $2, $3, $4)
      `;
      const retailerValues = [
        retailerId,
        name,
        contact_detail,
        contact_address,
      ];
      await client.query(insertRetailerQuery, retailerValues);

      // Update the user to set is_retailer to true and retailer_id
      const updateUserQuery = `
        UPDATE users
        SET is_retailer = TRUE, retailer_id = $1
        WHERE id = $2
      `;
      await client.query(updateUserQuery, [retailerId, userId]);

      // Commit the transaction
      await client.query("COMMIT");

      res.json({
        status: "success",
        msg: "New retailer added",
        retailerId: retailerId,
      });
    } catch (error) {
      // If any error occurs, rollback the transaction and handle the error
      await client.query("ROLLBACK");
      throw error;
    } finally {
      // Release the database client
      client.release();
    }
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

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

// UPDATE retailer details By Retailer ID
const patchRetailerByRetailerId = async (req, res) => {
  try {
    const retailerId = req.params.retailerId;
    const { name, contact_detail, contact_address } = req.body;

    const query = `
      UPDATE retailers
      SET name = $1, contact_detail = $2, contact_address = $3
      WHERE id = $4
    `;

    const values = [name, contact_detail, contact_address, retailerId];
    await pool.query(query, values);

    res.json({ status: "success", msg: "Retailer details updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// ADD new product
const addNewProduct = async (req, res) => {
  try {
    const { retailerId, shoeId, datePurchased, quantity } = req.body;
    const query = `
      INSERT INTO products (retailer_id, shoe_id, date_purchased, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const values = [retailerId, shoeId, datePurchased, quantity];
    const newProduct = await pool.query(query, values);

    res.json({
      status: "success",
      msg: "New product added",
      productId: newProduct.rows[0].id,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// GET all products by retailer ID
const getAllProductsByRetailerId = async (req, res) => {
  try {
    const retailerId = req.params.retailerId;
    const query = `
      SELECT p.id AS product_id,
        p.shoe_id,
        p.date_purchased,
        p.quantity AS product_quantity,
        r.id AS retailer_id,
        r.name AS retailer_name
      FROM products p
      JOIN retailers r ON p.retailer_id = r.id
      WHERE r.id = $1
    `;
    const products = await pool.query(query, [retailerId]);
    res.json(products.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// GET product by productID
const getProductByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    const query = `
      SELECT p.id AS product_id,
        p.shoe_id,
        p.date_purchased,
        p.quantity AS product_quantity,
        r.id AS retailer_id,
        r.name AS retailer_name
      FROM products p
      JOIN retailers r ON p.retailer_id = r.id
      WHERE p.id = $1
    `;
    const product = await pool.query(query, [productId]);

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
    const productId = req.params.productId;
    const { quantity } = req.body;
    const query = `
      UPDATE products
      SET quantity = $1
      WHERE id = $2
    `;
    const values = [quantity, productId];
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
    const { retailerId, productId, quantity, orderDate, orderStatus } =
      req.body;

    // Start a transaction
    await client.query("BEGIN");

    // Insert the new order
    const insertOrderQuery = `
      INSERT INTO orders (retailer_id, product_id, quantity, order_date, order_status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    const orderValues = [
      retailerId,
      productId,
      quantity,
      orderDate,
      orderStatus,
    ];
    const newOrder = await client.query(insertOrderQuery, orderValues);
    const orderId = newOrder.rows[0].id;

    // Update the product quantity in the products table
    const updateProductQuantityQuery = `
      UPDATE products
      SET quantity = quantity - $1
      WHERE id = $2
    `;
    const updateValues = [quantity, productId];
    await client.query(updateProductQuantityQuery, updateValues);

    // Commit the transaction
    await client.query("COMMIT");

    res.json({
      status: "success",
      msg: "New order added",
      orderId: orderId,
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
    const retailerId = req.params.retailerId;
    const query = `
      SELECT o.id AS order_id,
        o.product_id,
        o.quantity AS order_quantity,
        o.order_date,
        o.order_status,
        p.retailer_id,
        p.shoe_id,
        p.date_purchased,
        p.quantity AS product_quantity
      FROM orders o
      JOIN products p ON o.product_id = p.id
      WHERE p.retailer_id = $1
    `;
    const orders = await pool.query(query, [retailerId]);
    res.json(orders.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

// GET order by orderID
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const query = `
      SELECT o.id AS order_id,
        o.product_id,
        o.quantity AS order_quantity,
        o.order_date,
        o.order_status,
        p.retailer_id,
        p.shoe_id,
        p.date_purchased,
        p.quantity AS product_quantity
      FROM orders o
      JOIN products p ON o.product_id = p.id
      WHERE o.id = $1
    `;
    const order = await pool.query(query, [orderId]);

    // Check if an order with the specified ID exists
    if (order.rows.length === 0) {
      return res.status(404).json({ status: "error", msg: "Order not found" });
    }

    res.json(order.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", msg: error.message });
  }
};

// UPDATE order_status by order ID
const updateOrderStatusByOrderId = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { orderStatus } = req.body;
    const query = `
      UPDATE orders
      SET order_status = $1
      WHERE id = $2
    `;
    const values = [orderStatus, orderId];
    await pool.query(query, values);

    res.json({ status: "success", msg: "Order status updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", msg: error.message });
  }
};

module.exports = {
  addNewRetailer,
  getAllRetailers,
  getRetailerById,
  patchRetailerByRetailerId,
  addNewProduct,
  getAllProductsByRetailerId,
  getProductByProductId,
  updateProductQuantitybyProductId,
  addNewOrder,
  getAllOrdersByRetailerId,
  getOrderById,
  updateOrderStatusByOrderId,
};
