const { hashPassword, isPasswordMatched } = require("../config/bcrypt");
const { tryCatch } = require("../utils/tryCatch");
const db = require("../config/db");

const createUser = tryCatch(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await db.query(`SELECT * from "user" where email = $1`, [email]);
  if (user.rowCount)
    throw new Error("User with such email is already registered.");

  const hash = await hashPassword(password);

  const newUser = await db.query(
    `INSERT INTO "user" (name, email, password) values ($1, $2, $3) RETURNING name, email, password`,
    [name, email, hash]
  );

  if (!newUser) throw new Error("User registration failed.");

  res.status(200).json({
    success: true,
    data: newUser.rows[0],
  });
});

const deleteUser = tryCatch(async (req, res) => {
  const { email } = req.params;

  const user = await db.query(`SELECT * from "user" where email = $1`, [email]);

  if (!user.rowCount) throw new Error("No such user found.");

  const deletedUser = await db.query(
    `DELETE FROM "user" where email = $1 RETURNING id, name, email`,
    [email]
  );

  res.status(200).json({
    success: true,
    data: deletedUser.rows[0],
  });
});

const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await db.query(`SELECT * from "user" where email = $1`, [email]);
  if (!user.rowCount) throw new Error("There is no user with such email.");

  const isPwdMatched = await isPasswordMatched(password, user.rows[0].password);
  if (!isPwdMatched) throw new Error("Invalid password.");

  // const [emailName, domain] = email.split("@");

  // res.cookie("email", emailName, {
  //   httpOnly: false,
  //   secure: true,
  //   // sameSite: "none",
  //   // domain: "https://mern-tester-front.vercel.app",
  //   maxAge: 72 * 60 * 60 * 1000,
  // });
  // res.cookie("domain", domain, {
  //   httpOnly: false,
  //   secure: true,
  //   // sameSite: "none",
  //   // domain: "https://mern-tester-front.vercel.app",
  //   maxAge: 72 * 60 * 60 * 1000,
  // });

  res.json({
    success: true,
    data: user.rows[0],
  });
});

const logout = tryCatch(async (req, res) => {
  // const cookie = req.headers.cookie;
  // const [domain, emailName] = cookie.split(";");
  const email = req.userEmail;

  // if (!emailName || !domain) throw new Error("No user data in Cookies.");

  const newUser = await db.query(
    `UPDATE "user" SET isLoggedIn = FALSE where email = $1 RETURNING id, email, isLoggedIn`,
    [email]
  );

  // res.clearCookie("email", {
  //   httpOnly: true,
  //   secure: true,
  // });
  // res.clearCookie("domain", {
  //   httpOnly: true,
  //   secure: true,
  // });

  res.json({
    success: true,
    data: newUser.rows[0],
  });
});

module.exports = { createUser, login, deleteUser, logout };
