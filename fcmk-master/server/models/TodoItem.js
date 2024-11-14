const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  userId: {
    type: String
  },
  text: {
    type: String,
  },
  created_at: {
    type: Date,
    default: () => Date.now()
  },
  complete_at:{
    type:Date,
    default:null
  },
  completed_at: {
    type: Date,
    default:null
  },
  creatorId: {
    type: String
  },
  completed:{
    type: Boolean,
    default: false
  }
});

mongoose.model("todos", todoSchema);