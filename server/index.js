const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
// const route = require("./src/routes");
const db = require("./config/db");

//Connect db
db.connect();

dotenv.config();
const app = express();

const port = `${process.env.PORT}` | 8000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes init
// route(app);

app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

// run
app.listen(port, "0.0.0.0", () => {
  console.log(`Server run with port:${port}`);
});

module.exports = app;
