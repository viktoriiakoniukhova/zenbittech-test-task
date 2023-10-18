const express = require("express");
const router = express.Router();
const { getDeals, addDeal } = require("../controller/dealController");

router.get("/all", getDeals);
router.post("/add", addDeal);

module.exports = router;
