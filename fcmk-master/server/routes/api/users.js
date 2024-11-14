const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const passport = require("passport");
require("../../models/User");
const User = mongoose.model("users");
require("../../models/TodoItem");
const Todos = mongoose.model("todos");
const moment = require('moment-timezone');

// todoData: {
//     userId: '6188e7610c8dc06bb0c61a20',
//     text: '1212',
//     creatorId: '6188e7610c8dc06bb0c61a20'
//   }



router.post("/addmasstodo", (req, res) => {
    console.log('//addmasstodo');
    let userIds = [];
    const promises = req.body.userRoles.map((role) => {
        return User.find({ role: role.value })
            .then(foundUser => {
                if (foundUser) {
                    foundUser.forEach(foundUserItem => {
                        userIds.push(foundUserItem._id);
                        return foundUserItem;
                    });
                }
            })
    });
    Promise.all(promises).then((users) => {
        const promises2 = userIds.map((userId) => {

            let todoData = {
                "userId": userId,
                "text": req.body.todoData.text,
                "complete_at": req.body.todoData.complete_at,
                "creatorId": req.body.todoData.creatorId,
                "created_at": req.body.todoData.created_at,
            }
            return Todos.create(todoData)
                .then(createdTodo => {
                    if (createdTodo) {
                        console.log('createdTodo')
                        console.log(createdTodo);
                        return createdTodo;
                    }
                })
        });

        Promise.all(promises2).then((todos) => {
            console.log('Итого создано - ')
            console.log(todos);
            return res.json({ success: true });
        })

    });

})

router.post("/addtodo", (req, res) => {
    console.log('//addtodo');
    console.log(req.body);
    let tododata = {
        text: req.body.todoData.text,
        userId: req.body.todoData.userId,
        creatorId: req.body.todoData.creatorId,
        complete_at: req.body.todoData.completeAt
    }
    Todos.create(tododata)
        .then(createdtodo => {
            User.findOne({ _id: req.body.todoData.creatorId })
                .then(creator => {
                    console.log(creator);
                    let newtodo = {
                        "_id": createdtodo._id,
                        "text": createdtodo.text,
                        "creatorName": creator.name,
                        "createdAt": createdtodo.created_at,
                        "completedAt": createdtodo.completed_at,
                        "completeAt": createdtodo.complete_at,
                    }
                    console.log('Создана задача');
                    return res.json({ success: true, newtodo });

                })

        })
}
);


router.post("/getusertodo", (req, res) => {
    console.log('//getusertodo');
    console.log(req.body);

    let usertodos = [];
    Todos.find({ userId: req.body.userId }, (err, todos) => {
        console.log(todos)
        const promises = todos.map((todo) => {
            return User.findById(todo.creatorId)
                .then(creatorName => {
                    console.log(creatorName);
                    let todoItem = {
                        "_id": todo._id,
                        "text": todo.text,
                        "creatorName": creatorName.name,
                        "createdAt": todo.created_at,
                        "completedAt": todo.completed_at,
                        "completeAt": todo.complete_at,
                    }
                    console.log(todoItem)
                    usertodos.push(todoItem);
                })
        });

        Promise.all(promises).then(() => {
            console.log('completed');
            console.log(usertodos);
            return res.json({ success: true, usertodos });
        });
    })


    // Todos.find({ userId: req.body.userId })
    //     .then(usertodos => {
    //         return res.json({ success: true, usertodos })
    //     })
}
);

router.post("/deleteusertodo", (req, res) => {
    console.log('//deleteusertodo');
    console.log(req.body);

    User.findOne({ _id: req.body.userId })
        .then(user => {
            if (user.role == 'admin') {
                Todos.findOneAndDelete({ _id: req.body.todoId })
                    .then(deletedtodo => {
                        console.log('Удалена задача');
                        console.log(deletedtodo)
                        return res.json({ success: true, deletedtodo });
                    })
            }
        })

}
);


router.post("/deletealldeadlinetodo", (req, res) => {
    console.log('//deletealldeadlinetodo');
    console.log(req.body);

    User.findOne({ _id: req.body.userId })
        .then(user => {
            if (user.role == 'admin') {





                var conditions = {};
                let start = moment().subtract(100, 'years').startOf('day');
                let end = moment();
                let condition = { "$gt": start, "$lt": end };
                conditions['complete_at'] = condition;
                conditions['completed'] = false;
                var query = Todos.find(conditions).sort('');
                query.exec(function (err, todoDeadlined) {
                    console.log(todoDeadlined);
                    if (err) throw err;
                    var promises = todoDeadlined.map((todo) => {
                        return Todos.findOneAndDelete({ _id: todo._id })
                            .then(deletedtodo => {
                                console.log('Удалена задача');
                                return todo;
                            })
                    });
                    Promise.all(promises).then(() => {
                        console.log('DELETED');
                        console.log('promises');
                        Todos.countDocuments({}, function (err, tododocCount) {
                            return res.json({ success: true, tododocCount });
                        })
                    });



                    // return res.json({ success: true, data });
                });


            }
        })

}
);


router.post("/edituser", (req, res) => {
    console.log('//edituser');
    console.log(req.body);
    User.findOne({ email: req.body.userData.email })
        .then(editeduser => {
            console.log(editeduser)
            let psw = editeduser.password;
            if (psw != req.body.userData.password) {
                if (req.body.userData.password.length > 0) {
                    psw = req.body.userData.password
                }
            }

            editeduser.name = req.body.userData.name;
            editeduser.email = req.body.userData.email;
            editeduser.phone = req.body.userData.phone;
            editeduser.role = req.body.role;
            editeduser.password = psw;

            editeduser.save(function (err) {
                editeduser.password = '';
                return res.json({ success: true, editeduser });
            });
        })
}
);

router.post("/getuserslist", (req, res) => {
    console.log('//getuserslist');
    console.log(req.body);
    User.find().select('-password -hash')
        .then(users => {
            if (users) {

                let userRoles = [
                    { value: 'admin', label: 'Администратор ( Глав-врач )' },
                    { value: 'main-paramedic', label: 'Главный фельдшер' },
                    { value: 'medical-paramedic', label: 'Старший фельдшер' },
                    { value: 'nurse-man', label: 'Старший мед брат' },
                    { value: 'dispatcher', label: 'Диспетчер' },
                    { value: 'user', label: 'Пользователь' },
                    { value: 'nurseman', label: 'Медицинский брат - анестезист' },
                    { value: 'nurse-anesth', label: 'Медицинская сестра - анестезист' },
                    { value: 'paramedic', label: 'Фельдешер скорой медицинской помощи' }
                ]

                return res.json({ success: true, users, userRoles });
            } else {
                return res.json({ success: false });
            }
        })
}
);

router.post("/deleteuser", (req, res) => {
    console.log('//deleteuser');
    console.log(req.body);

    User.findOneAndDelete({ email: req.body.user })
        .then(deleteduser => {
            console.log('Удален пользователь');
            return res.json({ success: true, deleteduser });
        })

}
);

router.post("/adduser", (req, res) => {
    console.log('//adduser');
    console.log(req.body);

    let userdata = {
        name: req.body.userData.name,
        email: req.body.userData.email,
        phone: req.body.userData.phone,
        password: req.body.userData.password,
        role: req.body.role,
    }

    User.create(userdata)
        .then(newuser => {
            console.log('Создан пользователь');
            return res.json({ success: true, newuser });
        })

}
);



module.exports = router;