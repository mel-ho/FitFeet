require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const users = require("./src/routers/users");
const retail = require("./src/routers/retail");

const limit = rateLimit({
  windowMs: 15 * 6 * 1000, // 15 mins
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

// middleware
app.use(cors());
app.use(helmet());
app.use(limit);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/users", users);
app.use("/retail", retail);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});