const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const passport = require("passport");
require("../../models/Equipment");
const Equipment = mongoose.model("equipments");


router.post("/getequipmentlist", (req, res) => {
    console.log('getequipmentlist');
    Equipment.find()
    .then(equipments => {
        return res.json({ success: true, equipments });
    })
})

router.post("/addequip", (req, res) => {
    console.log('addequip');
    Equipment.create(req.body.equipment)
    .then(newequipment => {
        return res.json({ success: true, newequipment });
    })
})


module.exports = router;
