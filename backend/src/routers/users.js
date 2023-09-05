const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, patchUser } = require("../controllers/users");

router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.patch("/users/:userId", patchUser);

module.exports = router;
