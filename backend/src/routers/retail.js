const express = require("express");
const router = express.Router();
const { getAllRetailers, getRetailerById } = require("../controllers/retail");

router.get("/retailers", getAllRetailers);
router.get("/retailers/:retailerId", getRetailerById);

module.exports = router;
