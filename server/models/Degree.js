const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const degreeSchema = new Schema({
  name: { type: String, required: true, maxlength: 50 },
  school : { type: String, required: true, maxlength: 50 },
  completed : { type: Boolean, default: true },
  type: {type: String},
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});


module.exports = mongoose.model('Degree', degreeSchema);
