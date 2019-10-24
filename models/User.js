const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);
