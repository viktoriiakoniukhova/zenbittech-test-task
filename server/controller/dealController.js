const { tryCatch } = require("../utils/tryCatch");
const db = require("../config/db");

const getDeals = tryCatch(async (req, res) => {
  const deals = await db.query(`SELECT * from "deal"`);

  res.status(200).json({
    success: true,
    data: deals.rows,
  });
});

const addDeal = tryCatch(async (req, res) => {
  const {
    title,
    price,
    tiketPrice,
    yieldPercent,
    soldPercent,
    daysLeft,
    imgUrl,
  } = req.body;

  const newDeal = await db.query(
    `INSERT INTO "deal" (title, price, tiketPrice, yieldPercent, soldPercent, daysLeft, imgUrl) values ($1, $2, $3, $4, $5, $6, $7) RETURNING id, title, price`,
    [title, price, tiketPrice, yieldPercent, soldPercent, daysLeft, imgUrl]
  );

  res.status(200).json({
    success: true,
    data: newDeal.rows[0],
  });
});

module.exports = { addDeal, getDeals };
