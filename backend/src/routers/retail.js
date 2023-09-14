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
  getOrderByUserId,
  getOrderStatus,
  updateOrderStatusByOrderId,
} = require("../controllers/retail");

const checkValid = require("../middleware/checkValid");
const { authUser, authRetailer, authAdmin } = require("../middleware/auth");

router.put("/retailers", authAdmin, checkValid, addNewRetailer);
router.get("/retailers", authAdmin, getAllRetailers);
router.get("/retailers/:retailerId", authRetailer, getRetailerById);
router.patch(
  "/retailers/:retailerId",
  authRetailer,
  checkValid,
  patchRetailerByRetailerId
);

router.put("/products", checkValid, authRetailer, addNewProduct);
router.get("/products/:retailerId", authRetailer, getAllProductsByRetailerId);
router.get("/products/:productId", authRetailer, getProductByProductId);
router.patch(
  "products/:productId",
  authRetailer,
  checkValid,
  updateProductQuantitybyProductId
);

router.put("/orders", authUser, checkValid, addNewOrder);
router.get("/orders/r/:retailerId", authRetailer, getAllOrdersByRetailerId);
router.get("/orders/u/:userId", authUser, getOrderByUserId);

router.get("/orderstatus/", authRetailer, getOrderStatus);
router.patch(
  "/orderstatus/:orderId",
  authRetailer,
  checkValid,
  updateOrderStatusByOrderId
);

module.exports = router;
