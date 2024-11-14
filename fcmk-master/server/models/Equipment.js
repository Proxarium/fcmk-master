const mongoose = require("mongoose");
const { Schema } = mongoose;

const equipmentSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    headertext: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    extra: {
        type: String,
        default: ''
    },
    images: []
});

mongoose.model("equipments", equipmentSchema);