const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/shoes");

const checkValid = require("../middleware/checkValid");
const { authUser, authRetailer, authAdmin } = require("../middleware/auth");

router.put("/brand", authRetailer, checkValid, addBrand);
router.get("/brand", authRetailer, getAllBrands);

router.put("/model/", authRetailer, checkValid, addModel);
router.get("/model/", authRetailer, getAllModels);

router.get("/sizecountry", authRetailer, getAllCountries);
router.put("/sizes", authRetailer, checkValid, addSize);
router.get("/sizes", authRetailer, getAllSizes);
router.get("/sizes/:country", authRetailer, getSizesbyCountry);

router.put("/shoes", authUser, checkValid, addShoes);
router.get("/shoes", authAdmin, getAllShoes);
router.get("/shoes/:shoeId", authUser, getShoeByShoeId);
router.get("/shoes/b/:brand", authUser, getShoesByBrand);

router.put("/usershoes", authUser, addUserShoes);
router.get("/usershoes", authUser, getAllUserShoes);
router.get("/usershoes/:userId", authUser, getUserShoesByUserId);
router.post("/usershoes/:usershoeId", authUser, getUserShoeByUsershoeId);

module.exports = router;
