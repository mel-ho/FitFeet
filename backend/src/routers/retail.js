const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/retail");

router.put("/retailers", addNewRetailer);
router.get("/retailers", getAllRetailers);
router.get("/retailers/:retailerId", getRetailerById);
router.patch("/retailers/:retailerId", patchRetailerByRetailerId);

router.put("/products", addNewProduct);
router.get("/products/:retailerId", getAllProductsByRetailerId);
router.get("/products/:productId", getProductByProductId);
router.patch("products/:productId", updateProductQuantitybyProductId);

router.put("/orders", addNewOrder);
router.get("/orders/:retailerId", getAllOrdersByRetailerId);
router.get("/orders/:orderId", getOrderById);
router.patch("orders/:orderId", updateOrderStatusByOrderId);

module.exports = router;
