const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const passport = require("passport");
const validator = require("validator");
const isEmpty = require("../../utils/isEmpty");
const jwt = require("jsonwebtoken");
const key = require("../../config/dbsecret");

require("../../models/User");
const User = mongoose.model("users");


router.post("/cplogin", (req, res, next) => {
    console.log('/cplogin')
    const { errors, isValid } = validateLogin(req.body);

    function validateLogin(data) {
        let errors = {};
        if (validator.isEmpty(data.login)) {
            errors.email = "Email не заполнен";
        }
        if (validator.isEmpty(data.password)) {
            errors.password = "Требуется пароль";
        }
        return {
            errors,
            isValid: isEmpty(errors)
        };
    }

    if (!isValid) {
        return res.status(400).json(errors);
    } else {
        User.findOne({ email: { $regex: new RegExp('^' + req.body.login + '$', "i") }, password: req.body.password })
            .then(user => {
                if (!user) {
                    errors.login = "Пользователя не существует";
                    return res.status(400).json(errors);
                } else {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        role: user.role,
                    };
                    jwt.sign(
                        payload,
                        key.secretOrKey,
                        { expiresIn: "30 days" },
                        (err, token) => {
                            console.log(token)
                            res.json({ success: true, token: "JWT " + token });
                        }
                    );
                }
            })
            .catch(ex => {
                return res.status(500).send("Что-то пошло не так");
            });
    }
});

router.post("/login", (req, res) => {
    console.log('//login');
    console.log(req.body);
    User.findOne({ email: { $regex: new RegExp('^' + req.body.login + '$', "i") }, password: req.body.password }, (err, user) => {
        if (user) {
            console.log('найден')
            var hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            user.hash = hash;
            user.save(function (err) {
                user.password = null;
                return res.json({ success: true, user });
            });
        } else {
            console.log('не найден');
            return res.json({ success: false, reason: 'not-found' });
        }
    })
}
);


router.post("/checkprofile", (req, res) => {
    console.log('//checkprofile');
    console.log(req.body);
    User.findOne({ email: { $regex: new RegExp('^' + req.body.login + '$', "i") }, hash: req.body.hash }, (err, user) => {
        if (user) {
            console.log('найден')
            user.save(function (err) {
                user.password = null;
                return res.json({ success: true, user });
            });
        } else {
            console.log('не найден');
            return res.json({ success: false, reason: 'not-found' });
        }
    })
}
);


module.exports = router;