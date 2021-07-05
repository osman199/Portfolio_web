const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  surname: { type: String },
  email: { type: String },
  username: { type: String },
  password: { type: String },
  city: { type: String },
  country: { type: String },
  address: { type: String },
  age: { type: Number, default: 16 },
  publish: { type: Boolean, default: true }
});

module.exports = mongoose.model("User", userSchema);
