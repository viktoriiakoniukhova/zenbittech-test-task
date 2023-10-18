const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const dotenv = require("./node_modules/dotenv").config();
const app = express();
const PORT = process.env.PORT;
const dealRoute = require("./routes/dealRoute");
const authRoute = require("./routes/authRoute");

// Set middleware of CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", proccess.env.URL_CLIENT);
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.use(express.json());
app.use("/api/deal", dealRoute);
app.use("/api/auth", authRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
