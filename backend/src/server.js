require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes");
const { authJWT, errorHandler } = require("./middleware");
const sequelize = require("./sequelize");
const port = 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  })
);
app.use(authJWT);
app.use("/", routes);
app.use(errorHandler);

sequelize
  .authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  });
