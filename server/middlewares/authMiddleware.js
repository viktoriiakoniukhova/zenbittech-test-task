const { tryCatch } = require("../utils/tryCatch");
const db = require("../config/db");

const authMiddleware = async (req, res, next) => {
  try {
    const { email } = req.body;
    const newUser = await db.query(
      `UPDATE "user" SET isLoggedIn = TRUE where email = $1 RETURNING id, email, isLoggedIn`,
      [email]
    );
    req.user = newUser;
    next();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { authMiddleware };
