const mongoose = require("mongoose");
// const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
  name: { type: String, required: true, maxlength: 50 },
  level: { type: Number },
  type: {
    type: String,
    required: true,
    maxlength: 50,
    default: "Not Categorised"
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  course: { type: Schema.Types.ObjectId, ref: "Course" }
});

// skillSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Skill", skillSchema);
