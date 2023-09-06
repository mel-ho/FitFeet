const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/shoes");

router.put("/brand", addBrand);
router.get("/brand", getAllBrands);

router.put("/brandmodel", addBrandModel);
router.get("/brandmodel", getAllBrandModels);

router.put("/sizes", addSize);
router.get("/sizes", getAllSizes);

router.put("/shoes", addShoes);
router.get("/shoes", getAllShoes);
router.get("/shoes/:shoeId", getShoeByShoeId);

router.put("/usershoes", addUserShoes);
router.get("/usershoes", getAllUserShoes);
router.get("/usershoes/:userId", getUserShoesByUserId);
router.post("/usershoes/:usershoeId", getUserShoeByUsershoeId);

module.exports = router;
