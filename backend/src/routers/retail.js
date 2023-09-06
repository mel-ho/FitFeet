const express = require("express");
const router = express.Router();
const {
  addNewRetailer,
  getAllRetailers,
  getRetailerById,
  patchRetailerByRetailerId,
  getAllProductsByRetailerId,
  addNewProduct,
  updateProductQuantitybyProductId,
  getAllOrdersByRetailerId,
  addNewOrder,
  updateOrderStatusByOrderId,
} = require("../controllers/retail");

router.put("/retailers", addNewRetailer);
router.get("/retailers", getAllRetailers);
router.get("/retailers/:retailerId", getRetailerById);
router.patch("/retailers/:retailerId", patchRetailerByRetailerId);

router.get("/products/:retailerId", getAllProductsByRetailerId);
router.put("/products", addNewProduct);
router.patch("products/:productId", updateProductQuantitybyProductId);

router.get("/orders/:retailerId", getAllOrdersByRetailerId);
router.put("/orders", addNewOrder);
router.patch("orders/:orderId", updateOrderStatusByOrderId);

module.exports = router;
