const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  patchUser,
  addUserClimbingExperience,
  addUserFeetDimensions,
  getUserClimbingExperience,
  getUserFeetDimensions,
  updateUserClimbingExperience,
  updateUserFeetDimensions,
} = require("../controllers/users");

router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.patch("/users/:userId", patchUser);
router.put("/userexp/:userId", addUserClimbingExperience);
router.put("/userfeet/:userId", addUserFeetDimensions);
router.get("/userexp/:userId", getUserClimbingExperience);
router.get("/userfeet/:userId", getUserFeetDimensions);
router.patch("/userexp/:userId", updateUserClimbingExperience);
router.patch("/userfeet/:userId", updateUserFeetDimensions);

module.exports = router;
