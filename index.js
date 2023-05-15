// dotenv
const dotenv = require("dotenv");
dotenv.config("./.env");
// express
const express = require("express");
const app = express();

// mongoose and database
const DB = require("./config/mongoose");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./route"));

// error handler
app.use(require("./controller/err"));

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server started on port:", port);
});
