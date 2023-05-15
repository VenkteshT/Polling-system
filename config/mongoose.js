const mongoose = require("mongoose");

const DB = mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("database connection success");
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = DB;
