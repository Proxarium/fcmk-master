const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const passport = require("passport");
require("../../models/User");
const User = mongoose.model("users");
require("../../models/TodoItem");
const Todos = mongoose.model("todos");
const moment = require('moment-timezone');
require("../../models/BrigadeReport");
const BrigadeReport = mongoose.model("brigadereports");



router.post("/getongoingtodos", (req, res) => {
    console.log('//getongoingtodos');
    console.log(req.body);
    Todos.find({completed:false})
    .then(ongoingtodos => {

        var promises = ongoingtodos.map((todo) => {
            return User.findById(todo.creatorId)
                .then(creatorName => {
                    return User.findById(todo.userId)
                        .then(userName => {
                            let todoItem = {
                                "id": todo._id,
                                "text": todo.text,
                                "creatorName": creatorName.name,
                                "createdAt": todo.created_at,
                                "completedAt": todo.completed_at,
                                "completeAt": todo.complete_at,
                                "userName": userName.name,
                                "userId": userName._id,
                            }
                            return todoItem;
                        })

                })
        });
        Promise.all(promises).then(ongoingtodos => {
            console.log('deadlined');
            console.log('promises');
            return res.json({ success: true, ongoingtodos });
        });
    })
});

router.post("/getcompletedtodos", (req, res) => {
    console.log('//getcompletedtodos');
    console.log(req.body);
    Todos.find({completed:true})
    .then(completedtodos => {
        var promises = completedtodos.map((todo) => {
            return User.findById(todo.creatorId)
                .then(creatorName => {
                    return User.findById(todo.userId)
                        .then(userName => {
                            let todoItem = {
                                "id": todo._id,
                                "text": todo.text,
                                "creatorName": creatorName.name,
                                "createdAt": todo.created_at,
                                "completedAt": todo.completed_at,
                                "completeAt": todo.complete_at,
                                "userName": userName.name,
                                "userId": userName._id,
                            }
                            return todoItem;
                        })

                })
        });
        Promise.all(promises).then(completedtodos => {
            console.log('deadlined');
            console.log('promises');
            return res.json({ success: true, completedtodos });
        });
    })
});


router.post("/getdeadlinedtodos", (req, res) => {
    console.log('//getdeadlinedtodos');
    console.log(req.body);

    var conditions = {};
    let start = moment().subtract(100, 'years').startOf('day');
    let end = moment();
    let condition = { "$gt": start, "$lt": end };
    // let condition2 = { "$ne": true }
    conditions['complete_at'] = condition;
    conditions['completed'] = false;

    Todos.find(conditions, (err, deadlinedtodos) => {
        console.log(deadlinedtodos)

        var promises = deadlinedtodos.map((todo) => {
            return User.findById(todo.creatorId)
                .then(creatorName => {
                    return User.findById(todo.userId)
                        .then(userName => {
                            let todoItem = {
                                "id": todo._id,
                                "text": todo.text,
                                "creatorName": creatorName.name,
                                "createdAt": todo.created_at,
                                "completedAt": todo.completed_at,
                                "completeAt": todo.complete_at,
                                "userName": userName.name,
                                "userId": userName._id,
                            }
                            return todoItem;
                        })

                })
        });


        Promise.all(promises).then(todoArray => {
            console.log('deadlined');
            console.log('promises');
            return res.json({ success: true, todoArray });
        });


    });



}
);


router.post("/getreportbyid", (req, res) => {
    console.log('/getreportbyid')
    BrigadeReport.findById(req.body.reportId)
    .then(brigade => {
        console.log(brigade);
        return res.json({ success: true, brigade });
    })  

})

router.post("/getdashboardinfo", (req, res) => {
    console.log('//getdashboardinfo');

    // какую инфу сгружать? 

    // кол-во пользователей
    // кол-во задач
    // кол-во выполненных задач
    // кол-во просроченных задач

    //TODO - бригады ( принятые )

    console.log(req.body);
    // кол-во пользователей
    User.countDocuments({}, function (err, userdocCount) {

        // кол-во задач
        Todos.countDocuments({}, function (err, tododocCount) {

            // кол-во выполненных задач

            Todos.countDocuments({ completed: true }, function (err, todoCompleteddocCount) {

                // кол-во просроченных задач
                var conditions = {};
                let start = moment().subtract(100, 'years').startOf('day');
                let end = moment();
                let condition = { "$gt": start, "$lt": end };
                conditions['complete_at'] = condition;
                conditions['completed'] = false;
                var query = Todos.find(conditions).sort('');
                query.exec(function (err, todoDeadlined) {
                    // console.log(todoDeadlined);
                    if (err) throw err;

                    let data = {
                        userCount: userdocCount,
                        todoCount: tododocCount,
                        todoCompletedCount: todoCompleteddocCount,
                        todoDeadlinedCount: todoDeadlined.length
                    }

                    //Активные бригады и их отчет                    
                    BrigadeReport.find({isActive:true})
                    .then(ongoingbrigade => {
                        console.log(ongoingbrigade);
                        return res.json({ success: true, data, ongoingbrigade });
                    })

                });
            });
        });
    });
}
);





module.exports = router;