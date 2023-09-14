const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  patchUser,
  addUserFeetDimensions,
  getUserClimbingExperience,
  getUserFeetDimensions,
  getUserAddress,
  updateUserClimbingExperience,
  updateUserFeetDimensions,
  updateUserAddress,
} = require("../controllers/users");

const checkValid = require("../middleware/checkValid");
const { authUser, authAdmin } = require("../middleware/auth");

router.get("/users", authAdmin, getAllUsers);
router.get("/users/:userId", authUser, getUserById);
router.patch("/users/:userId", authUser, checkValid, patchUser);
router.put("/userfeet/:userId", authUser, checkValid, addUserFeetDimensions);
router.get("/userexp/:userId", authUser, getUserClimbingExperience);
router.get("/userfeet/:userId", getUserFeetDimensions);
router.get("/useraddress/:userId", authUser, getUserAddress);
router.patch(
  "/userexp/:userId",
  authUser,
  checkValid,
  updateUserClimbingExperience
);
router.patch(
  "/userfeet/:userId",
  authUser,
  checkValid,
  updateUserFeetDimensions
);
router.patch("/useraddress/:userId", authUser, checkValid, updateUserAddress);

module.exports = router;
