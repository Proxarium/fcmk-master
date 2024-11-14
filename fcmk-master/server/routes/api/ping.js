const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
// const passport = require("passport");


router.get("/ping", (req, res) => {
    res.json({ msg: 'privet' });
})

module.exports = router;
