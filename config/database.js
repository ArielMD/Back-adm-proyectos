const mongoose = require("mongoose");
require("dotenv").config();

const conectionDB = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = conectionDB;
