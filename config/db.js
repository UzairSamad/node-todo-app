const mongoose = require("mongoose");
const config = require("config");

const Mongo_Uri =
  " mongodb+srv://uzair:12345@cluster0-xotjg.mongodb.net/todoapp ";

const connectDB = async () => {
  try {
    await mongoose.connect(Mongo_Uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("Mongodb Connected Succesfully");
  } catch (error) {
    console.log("Unable to connect", error.message);
  }
};

module.exports = connectDB;
