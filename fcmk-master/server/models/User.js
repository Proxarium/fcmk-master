const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema
const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  hash:{
    type: String,
  },
  phone: {
    type: String
  },
  role: {
    type: String,
    default: "user"
  },
  password: {
    type: String
  }
});

mongoose.model("users", userSchema);


// 0 - admin  // глав-врач
// 1 - paramedic // глав-фельдшер
// 2 - medical-paramedic // старший-фельдшер по ах
// 3 - nurse-man // старший мед брат
// 4 - dispatcher // диспетчер
// 5 - user // пользователь без прав