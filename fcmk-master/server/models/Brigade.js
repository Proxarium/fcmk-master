const mongoose = require("mongoose");
const { Schema } = mongoose;

const brigadeSchema = new Schema({
    brigadeName: {
        type: String,
        default: ''
    },
    brigadeUsers: [],
    selectedCar: {},
    workStarted:{
        type:Date
    },
    equipment: []
});

mongoose.model("brigades", brigadeSchema);


