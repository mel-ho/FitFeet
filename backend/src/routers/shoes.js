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

router.put("/brand", authUser, checkValid, addBrand);
router.get("/brand", authUser, getAllBrands);

router.put("/model/", authUser, checkValid, addModel);
router.get("/model/", authUser, getAllModels);

router.get("/sizecountry", authUser, getAllCountries);
router.put("/sizes", authUser, checkValid, addSize);
router.get("/sizes", authUser, getAllSizes);
router.get("/sizes/:country", authUser, getSizesbyCountry);

router.put("/shoes", authUser, checkValid, addShoes);
router.get("/shoes", authAdmin, getAllShoes);
router.get("/shoes/:shoeId", authUser, getShoeByShoeId);
router.get("/shoes/b/:brand", authUser, getShoesByBrand);

router.put("/usershoes", authUser, addUserShoes);
router.get("/usershoes", authUser, getAllUserShoes);
router.get("/usershoes/:userId", authUser, getUserShoesByUserId);
router.post("/usershoes/:usershoeId", authUser, getUserShoeByUsershoeId);

module.exports = router;
