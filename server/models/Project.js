const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true, maxlength: 50 },
  detail: { type: String, required: true, maxlength: 200 },
  link: { type: String, maxlength: 200 },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  picture: { type: String, maxlength: 200 },
});

module.exports = mongoose.model("Project", projectSchema);
