const mongoose = require("mongoose");
const { Schema } = mongoose;

const brigadeReportsSchema = new Schema({
    brigadeName: {
        type: String,
        default: '',
    },
    brigadeId: {
        type: String,
        default: ''
    },
    brigadeUsers: [],
    selectedCarId: {},
    timeStart: {
        type: Date,
        default: null
    },
    timeEnd: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    firstReport: [],
    secondReport: [],
    oxygenReport: [],
    comment: {
        type: String,
        default: ''
    },
    recipeItems:{
        personOneName: '',
        personTwoName: '',
        recipes:[],
        comment:''
    },
    personOne:{
        type: String,
        default: '',
    },
    personTwo:{
        type: String,
        default: '',
    }
});

mongoose.model("brigadereports", brigadeReportsSchema);