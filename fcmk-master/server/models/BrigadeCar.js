const mongoose = require("mongoose");
const { Schema } = mongoose;

const brigadecarSchema = new Schema({
    carNumber:{
        type: String,
        default:''
    },
    timeTaken:{
        type:Date
    },
    timeReturned:{
        type:Date
    },
    isTaken:{
        type:Boolean,
        default:false
    },
    equipment:[],
    oxygen:[],
    image:{
        type: String,
        default:''
    }
});

mongoose.model("brigadecars", brigadecarSchema);