const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: { type: String, required: true, maxlength: 50 },
  grade: { type: String, maxlength: 3 },
  degree: { type: Schema.Types.ObjectId, ref: "Degree" },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Course", courseSchema);
