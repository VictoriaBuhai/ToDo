const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: {
    type: String,
    minLength: 4,
    maxLength: 100,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
  },
});
module.exports = mongoose.model("Todo", TodoSchema);
