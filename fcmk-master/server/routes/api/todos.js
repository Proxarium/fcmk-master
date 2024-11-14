const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const passport = require("passport");
require("../../models/User");
const User = mongoose.model("users");
require("../../models/TodoItem");
const moment = require('moment-timezone');
const Todos = mongoose.model("todos");

// let tm= moment.now();
// console.log(Date.now())
// console.log('=')
// console.log(tm);
// console.log(moment.now());
// console.log(moment(tm).format('lll'))
// console.log(moment().tz('Europe/Moscow'));

router.post("/completetodo", (req, res) => {
    console.log('//completetodo');
    console.log(req.body);
    //hash
    //todoId

    //Делаем проверку на принадлежность пользователя
    //Ищем пользователя
    User.findOne({ hash: req.body.hash })
        .then(user => {
            if (user) {
                console.log('найден');
                console.log(user.name);
                //Ищем todo
                Todos.findOne({ userId: user.id, _id: req.body.todoId })
                    .then(completedtodo => {
                        console.log('completedtodo')
                        console.log(completedtodo);

                        if (completedtodo) {
                            let tm= moment.now();
                            // console.log(moment(tm).format('lll'))
                            completedtodo.completed_at = moment(tm).format('lll')
                            completedtodo.completed = true;
                            completedtodo.save(function (err) {
                                User.findById(completedtodo.creatorId)
                                    .then(creatorName => {
                                        console.log('creator');
                                        console.log(creatorName)
                                        let todoItem = {
                                            "id": completedtodo._id
                                        }
                                        return res.json({ success: true, todoItem });

                                    })
                            });
                        } else {
                            return res.json({ success: false });
                        }

                    })
            } else {
                console.log('не найден');
                return res.json({ success: false });
            }
        })

}
);

router.post("/gettodos", (req, res) => {
    console.log('//gettodos');
    console.log(req.body);

    User.findOne({ hash: req.body.hash }, (err, user) => {
        if (user) {

            let todoArray = [];

            Todos.find({ userId: user.id, completed: false }, (err, todos) => {
                // console.log(todos)
                const promises = todos.map((todo) => {
                    return User.findById(todo.creatorId)
                        .then(creatorName => {
                            // console.log(creatorName);
                            let todoItem = {
                                "id": todo._id,
                                "text": todo.text,
                                "creatorName": creatorName.name,
                                "createdAt": todo.created_at,
                                "completedAt": todo.completed_at,
                                "completeAt": todo.complete_at,
                            }
                            // console.log(todoItem)
                            todoArray.push(todoItem);
                        })
                });

                Promise.all(promises).then(() => {
                    // console.log('completed');
                    // console.log(todoArray);
                    return res.json({ success: true, todoArray });
                });

                // return res.json({ success: false, todos });
            })
        } else {
            return res.json({ success: false });
        }
    })

}
);



module.exports = router;