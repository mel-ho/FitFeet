const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  patchUser,
  addUserClimbingExperience,
  addUserFeetDimensions,
  addUserAddress,
  getUserClimbingExperience,
  getUserFeetDimensions,
  getUserAddress,
  updateUserClimbingExperience,
  updateUserFeetDimensions,
  updateUserAddress,
  recommender,
} = require("../controllers/users");

router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.patch("/users/:userId", patchUser);
router.put("/userexp/:userId", addUserClimbingExperience);
router.put("/userfeet/:userId", addUserFeetDimensions);
router.put("/useraddress/:userId", addUserAddress);
router.get("/userexp/:userId", getUserClimbingExperience);
router.get("/userfeet/:userId", getUserFeetDimensions);
router.get("/useraddress/:userId", getUserAddress);
router.patch("/userexp/:userId", updateUserClimbingExperience);
router.patch("/userfeet/:userId", updateUserFeetDimensions);
router.patch("/useraddress/:userId", updateUserAddress);

module.exports = router;
