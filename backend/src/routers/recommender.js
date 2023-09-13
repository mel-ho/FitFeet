const express = require("express");
const router = express.Router();
const { recommender } = require("../controllers/recommender");

router.get("/:userId", recommender);

module.exports = router;
