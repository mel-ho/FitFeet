const express = require("express");
const router = express.Router();
const { recommender } = require("../controllers/recommender");

const { authUser } = require("../middleware/auth");

router.get("/:userId", authUser, recommender);

module.exports = router;
