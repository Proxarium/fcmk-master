const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const passport = require("passport");
require("../../models/User");
const User = mongoose.model("users");
require("../../models/Brigade");
const Brigade = mongoose.model("brigades");
require("../../models/BrigadeCar");
const BrigadeCar = mongoose.model("brigadecars");
require("../../models/BrigadeReport");
const BrigadeReport = mongoose.model("brigadereports");
require("../../models/Equipment");
const Equipment = mongoose.model("equipments");
const sockets = require("../../sockets/socket");

const moment = require('moment-timezone');


router.post("/getequipinfo", (req, res) => {
    console.log('//getequipinfo');
    console.log(req.body.brigade);

    BrigadeCar.findById(req.body.brigade)
    .then(brigadecars => {
        let equipIds = [];
        brigadecars.equipment.map((equip, i) => {
            if(equip.equipItem != undefined){
                equipIds.push(equip.equipItem);
            }
        })

        Equipment.find().where('_id').in(equipIds).exec((err, equipment) => {
            console.log(equipment);
            return res.json({ success: true, equipment });

        });
       

    })
})

router.post("/getbrigadereports", (req, res) => {
    console.log('//getbrigadereports');
    console.log(req.body.auth);
    console.log(req.body.date);


    var conditions = {};
    let start = moment(req.body.date).startOf('day');
    let end = moment(req.body.date).endOf('day');
    let condition = { "$gt": start, "$lt": end };
    conditions['timeEnd'] = condition;
    conditions['isActive'] = false;
    var query = BrigadeReport.find(conditions).sort('');
    query.exec(function (err, brigadereports) {
        console.log(brigadereports.length);
        return res.json({ success: true, brigadereports });
    })
})


// "recipeItems": {
//     "personOneName": "Степанов",
//     "personTwoName": "Сиепанрв",
//     "recipes": [
//         {
//             "kvNum": "3456",

// "kvNum": "3456",


router.post("/searchkv", (req, res) => {
    console.log('//searchkv');
    console.log(req.body.value);
    BrigadeReport.find({
        // "recipeItems": {
        //     "recipes": { $elemMatch: { kvNum: req.body.value } }
        // }
        'recipeItems.recipes.kvNum': req.body.value
    })
        .then(brigadereports => {
            console.log(brigadereports);
            return res.json({ success: true, brigadereports });
        })
})

// { steps : { $elemMatch: { userId:ObjectId("53554b56e3a1e1dc17db903f")} } }


router.post("/sendrecipe", (req, res) => {
    console.log('//sendrecipe');
    console.log(req.body.recipe);
    console.log(req.body.hash);

    User.findOne({ hash: req.body.hash })
        .then(user => {
            console.log(user);
            BrigadeReport.findOne({
                isActive: true,
                brigadeUsers: {
                    $elemMatch: { id: mongoose.Types.ObjectId(user._id) }
                }
            })
                .then(brigadereport => {
                    console.log(brigadereport);
                    brigadereport.recipeItems = req.body.recipe;
                    brigadereport.save(function (err) {
                        console.log('Сохранено');
                        return res.json({ success: true });
                    })
                })
        })
})



router.post("/passbrigade", (req, res) => {
    console.log('//passbrigade');
    console.log(req.body.hash);
    console.log(req.body.brigade);

    console.log(req.body.recipe);

    // "brigadeUsers": [
    //     {
    //         "id": ObjectId("61819684e95e0000140079a2"),
    //         "name": "Дмитрий"
    //     },
    //     {
    //         "id": ObjectId("6188e7610c8dc06bb0c61a20"),
    //         "name": "Леонид"
    //     }
    // ],

    User.findOne({ hash: req.body.hash })
        .then(user => {
            console.log(user);
            BrigadeReport.findOne({
                isActive: true,
                brigadeUsers: {
                    $elemMatch: { id: mongoose.Types.ObjectId(user._id) }
                }
            })
                .then(brigadereport => {
                    console.log(brigadereport);

                    Brigade.findOne({
                        isActive: true,
                        brigadeUsers: {
                            $elemMatch: { id: mongoose.Types.ObjectId(user._id) }
                        }
                    })
                        .then(brigadeobj => {
                            brigadeobj.brigadeUsers = [];
                            brigadeobj.save(function (err) {
                                BrigadeCar.findById(brigadeobj.selectedCar.id)
                                    .then(brigadecar => {
                                        if (brigadereport) {
                                            brigadereport.timeEnd = Date.now();
                                            brigadereport.isActive = false;

                                            brigadereport.recipeItems = req.body.recipe;

                                            brigadecar.isTaken = false;
                                            brigadecar.timeTaken = null;
                                            console.log('Сохранено');
                                            brigadecar.save(function (err) {
                                                console.log('Сохранено');
                                                brigadereport.save(function (err) {
                                                    console.log('Сохранено');
                                                    sockets.completeReport(brigadereport._id);
                                                    return res.json({ success: true });
                                                })
                                            })
                                        }
                                    })

                            })
                        })







                })
        })
    // console.log()
});


router.post("/askbrigades", (req, res) => {
    console.log('//askbrigades');
    console.log(req.body.hash);
    User.findOne({ hash: req.body.hash })
        .then(user => {
            console.log(user);
            Brigade.findOne({
                brigadeUsers: {
                    $elemMatch: { id: mongoose.Types.ObjectId(user._id) }
                }
            }).select('-equipment')
                .then(brigade => {
                    if (brigade) {
                        console.log(brigade);


                        BrigadeReport.findOne({
                            isActive: true,
                            brigadeUsers: {
                                $elemMatch: { id: mongoose.Types.ObjectId(user._id) }
                            }
                        })
                            .then(brigadereport => {

                                // "selectedCar": {
                                //     "id": "61968e1dad27cbd663ed9224",
                                //     "carNumber": "092 Модульная реанимация новорожденных"
                                // },

                                BrigadeCar.findById(brigade.selectedCar.id).select('image')
                                .then(car => {
                                    console.log('car')
                                    console.log(car)
                                    let recipe = brigadereport.recipeItems;
                                    return res.json({ success: true, brigade, recipe, car });
                                })

                            })

                    } else {
                        return res.json({ success: true });
                    }

                })
        })
    // console.log()
});

router.post("/sendreport", (req, res) => {
    console.log('//sendreport');
    console.log(req.body);

    // brigadeName:{
    // type:String,
    // default:'',
    // }
    // brigadeId:{
    //     type: String,
    //     default:''
    // },
    // brigadeUsers:[],
    // selectedCarId:{
    //     type: String,
    //     default:''
    // },
    // timeStart:{
    //     type:Date
    // },
    // timeEnd:{
    //     type:Date
    // },
    // firstReport:[],
    // secondReport:[],
    // oxygenReport:[],
    // oxygenReports:[],

    // PersonModel.find({"favouriteFoods.name": "Sushi"});
    //[{text:String}]
    //Ищем пользователей

    // const docs = await Documents.find({category: { $in: [yourCategory] }});

    // members: { 
    //     $elemMatch: { id: id1 } 
    //  }

    let reportObject = {};

    Brigade.findOne({
        brigadeUsers: {
            $elemMatch: { id: mongoose.Types.ObjectId(req.body.user) }
        }
    })
        .then(brigade => {
            // console.log(brigade);
            reportObject.brigadeId = brigade._id;
            reportObject.brigadeUsers = [...brigade.brigadeUsers];
            reportObject.brigadeName = brigade.brigadeName;
            reportObject.timeStart = brigade.workStarted;
            reportObject.firstReport = req.body.stepOneReport;
            reportObject.secondReport = req.body.stepTwoReport;
            reportObject.oxygenReport = req.body.stepThreeReport;
            reportObject.comment = req.body.comment;
            reportObject.isActive = true;

            BrigadeCar.findById(brigade.selectedCar.id)
                .then(car => {
                    reportObject.selectedCarId = { number: car.carNumber, id: car._id };
                    BrigadeReport.create(reportObject)
                        .then(report => {
                            console.log(report);
                            sockets.newReport(report._id);
                            return res.json({ success: true });
                        })


                })

            //Создали пользователей
        })


});

router.post("/appsetbrigade", (req, res) => {
    console.log('//appsetbrigade');
    console.log(req.body);
    // {
    //     brigade: {
    //       _id: '6196818249060000ee000318',
    //       brigadeName: 'Васильки',
    //       brigadeUsers: []
    //     },
    //     brigadeCar: {
    //       _id: '61967ed849060000ee000316',
    //       carNumber: 'AHAHA99RUS',
    //       isTaken: false
    //     },
    //     user: {
    //       _id: '6188e7610c8dc06bb0c61a20',
    //       name: 'Леонид',
    //       email: '1@1.ru',
    //       phone: '+7 (977) 444-64-32',
    //       role: 'admin',
    //       password: null,
    //       __v: 0,
    //       hash: 'dxkf2v7nzq11v10vdz5lwq'
    //     }
    //   }

    var promises = new Promise((resolve, reject) => {
        Brigade.findOne({ "brigadeUsers.id": req.body.user._id }, null, function (err, brigade) {
            if (brigade) {
                let newUsersArray = brigade.brigadeUsers.filter((user) => user.id !== req.body.user._id);
                brigade.brigadeUsers = newUsersArray;
                brigade.save(function (err) {
                    console.log('Обновлено');
                    resolve(true)
                })
            } else {
                resolve(false)
            }
        });
    })

    var promises2 = new Promise((resolve, reject) => {
        Brigade.findOne({ "selectedCar.id": req.body.brigadeCar._id }, null, function (err, brigadecar) {
            if (brigadecar) {
                brigadecar.selectedCar = null;
                brigadecar.save(function (err) {
                    console.log('Обновлено');
                    resolve(true)
                })
            } else {
                resolve(false)
            }
        });
    })



    return Promise.all([promises, promises2]).then(array => {
        Brigade.findById(req.body.brigade._id)
            .then(brigade => {
                let userObj = {
                    "id": req.body.user._id,
                    "name": req.body.user.name,
                }
                let carObj = {
                    "id": req.body.brigadeCar._id,
                    "carNumber": req.body.brigadeCar.carNumber,
                }
                brigade.brigadeUsers.push(userObj);
                brigade.selectedCar = carObj;
                brigade.save(function (err) {
                    console.log('Бригада обновлена');
                    BrigadeCar.findById(req.body.brigadeCar._id)
                        .then(brigadecar => {
                            brigadecar.timeTaken = Date.now();
                            brigadecar.isTaken = true;
                            brigadecar.save(function (err) {
                                console.log('Машина обновлена');
                                return res.json({ success: true });
                            })
                        })

                });
            })
    })


    // Brigade.findOne({ "brigadeUsers.id": req.body.user._id })
    //     .then(brigade => {
    //         console.log('===')
    //         console.log(brigade);
    //         // state.userTodos.filter((todo) => todo._id !== id),
    //         let newUsersArray = brigade.brigadeUsers.filter((user) => user.id !== req.body.user._id);
    //         brigade.brigadeUsers = newUsersArray;
    //         brigade.save(function (err) {
    //             console.log('Обновлено');

    //             Brigade.findById(req.body.brigade._id)
    //                 .then(brigade => {
    //                     let userObj = {
    //                         "id": req.body.user._id,
    //                         "name": req.body.user.name,
    //                     }
    //                     let carObj = {
    //                         "id": req.body.brigadeCar._id,
    //                         "carNumber": req.body.brigadeCar.carNumber,
    //                     }
    //                     brigade.brigadeUsers.push(userObj);
    //                     brigade.selectedCar = carObj;
    //                     brigade.save(function (err) {
    //                         console.log('Бригада обновлена');
    //                         BrigadeCar.findById(req.body.brigadeCar._id)
    //                             .then(brigadecar => {
    //                                 brigadecar.timeTaken = Date.now();
    //                                 brigadecar.isTaken = true;
    //                                 brigadecar.save(function (err) {
    //                                     console.log('Машина обновлена');
    //                                     return res.json({ success: true });
    //                                 })
    //                             })

    //                     });
    //                 })

    //         })
    //     })

    // Brigade.find()
    // .then(allbrigades => {

    //     var promises = allbrigades.map((brigade) => {
    //         return User.findById(todo.creatorId)
    //             .then(creatorName => {
    //                 return User.findById(todo.userId)
    //                     .then(userName => {
    //                         let todoItem = {
    //                             "id": todo._id,
    //                             "text": todo.text,
    //                             "creatorName": creatorName.name,
    //                             "createdAt": todo.created_at,
    //                             "completedAt": todo.completed_at,
    //                             "completeAt": todo.complete_at,
    //                             "userName": userName.name,
    //                             "userId": userName._id,
    //                         }
    //                         return todoItem;
    //                     })

    //             })
    //     });


    //     Promise.all(promises).then(todoArray => {
    //         console.log('deadlined');
    //         console.log('promises');
    //         return res.json({ success: true, todoArray });
    //     });


    // })




});



router.post("/appsetbrigadeuserlist", (req, res) => {
    console.log('//appsetbrigadeuserlist');
    console.log(req.body)
    Brigade.findById(req.body.selectedBrigade._id)
        .then(brigade => {


            let secondUserObj = {
                "id": null,
                "name": null
            };
            let firstUserObj = {
                "id": null,
                "name": null
            };

            let secondUser = null;


            // "selectedCar": {
            //     "id": "61967e3f49060000ee000313",
            //     "carNumber": "942"
            // },


            if (req.body.brigadeUser != null) {
                secondUser = req.body.brigadeUser;
                User.findById(secondUser)
                    .then(seconduser => {
                        secondUserObj.name = seconduser.name;
                        secondUserObj.id = seconduser._id;
                        User.findById(req.body.user)
                            .then(firstuser => {
                                firstUserObj.name = firstuser.name;
                                firstUserObj.id = firstuser._id;
                                let array = [];
                                array.push(secondUserObj);
                                array.push(firstUserObj);
                                brigade.workStarted = moment().tz('Europe/Moscow');
                                brigade.brigadeUsers = array;
                                brigade.selectedCar = { id: req.body.selectedBrigadeCar._id, carNumber: req.body.selectedBrigadeCar.carNumber };
                                brigade.save(function (err) {

                                    BrigadeCar.findById(req.body.selectedBrigadeCar._id)
                                        .then(brigadecar => {
                                            brigadecar.timeTaken = Date.now();
                                            brigadecar.isTaken = true;
                                            brigadecar.save(function (err) {
                                                console.log('Машина обновлена');
                                                return res.json({ success: true });
                                            })
                                        })


                                });
                            })
                    })
            } else {
                User.findById(req.body.user)
                    .then(firstuser => {
                        firstUserObj.name = firstuser.name;
                        firstUserObj.id = firstuser._id;
                        let array = [];
                        array.push(firstUserObj);
                        brigade.workStarted = moment().tz('Europe/Moscow');
                        brigade.brigadeUsers = array;
                        brigade.selectedCar = { id: req.body.selectedBrigadeCar._id, carNumber: req.body.selectedBrigadeCar.carNumber };
                        brigade.save(function (err) {

                            BrigadeCar.findById(req.body.selectedBrigadeCar._id)
                                .then(brigadecar => {
                                    brigadecar.timeTaken = Date.now();
                                    brigadecar.isTaken = true;
                                    brigadecar.save(function (err) {
                                        console.log('Машина обновлена');
                                        return res.json({ success: true });
                                    })
                                })
                        });
                    })
            }



            // if (brigade.brigadeUsers.filter(e => e.id === req.body.user).length > 0) {
            //     User.findById(req.body.brigadeUser)
            //         .then(brigadeuser => {
            //             if(brigadeuser){
            //                 let brigadeUserObj = {
            //                     "id": brigadeuser._id,
            //                     "name": brigadeuser.name
            //                 }
            //                 brigade.workStarted = moment().tz('Europe/Moscow');
            //                 brigade.brigadeUsers.push(brigadeUserObj);
            //                 brigade.save(function (err) {
            //                     return res.json({ success: true });
            //                 });
            //             }else{
            //                 return res.json({ success: false });
            //             }

            //         })
            // } else {
            //     console.log('чтозанах')
            //     return res.json({ success: false });
            // } 
        })
});

router.post("/appgetbrigadeuserlist", (req, res) => {
    console.log('//appgetbrigadeuserlist');
    User.find({})
        .then(brigadeusers => {
            console.log(brigadeusers);
            return res.json({ success: true, brigadeusers });
        })
});

router.post("/appgetbrigadecar", (req, res) => {
    console.log('//appgetbrigadecar');
    BrigadeCar.find({ isTaken: false })
        .then(brigadeCarArray => {
            return res.json({ success: true, brigadeCarArray });
        })
});

router.post("/appgetbrigade", (req, res) => {
    console.log('//appgetbrigade');
    Brigade.find({brigadeUsers : {$exists:true, $size:0}})
        .then(brigadeArray => {
            return res.json({ success: true, brigadeArray });
        })
});

router.post("/addbrigade", (req, res) => {
    console.log('//addbrigade');
    let brigadeObj = {
        "brigadeName": req.body.brigade.brigadeName
    }
    Brigade.create(brigadeObj)
        .then(newbrigade => {
            return res.json({ success: true, newbrigade });
        })
});


router.post("/addbrigadecar", (req, res) => {
    console.log('//addbrigadecar');
    let brigadecarObj = {
        "carNumber": req.body.brigadecar.carNumber
    }
    BrigadeCar.create(brigadecarObj)
        .then(newbrigadecar => {
            return res.json({ success: true, newbrigadecar });
        })
});


router.post("/getbrigadeinfo", (req, res) => {
    console.log('//getbrigadeinfo');
    console.log(req.body);
    BrigadeCar.find({})
        .then(brigadeCars => {
            Brigade.find({})
                .then(brigades => {
                    return res.json({ success: true, brigadeCars, brigades });
                })
        })
});

router.post("/getcarequip", (req, res) => {
    console.log('//getcarequip');
    console.log(req.body);
    BrigadeCar.findById(req.body.carId)
        .then(carEquip => {
            // console.log(carEquip);
            let carEquipment = carEquip.equipment;
            let carOxygen = carEquip.oxygen;
            Brigade.findById(req.body.brigadeId)
                .then(brigadeEquip => {
                    // console.log(brigadeEquip);
                    let brigadeEquipment = brigadeEquip.equipment;

                    console.log('=');
                    console.log(carOxygen);
                    return res.json({ success: true, carEquipment, brigadeEquipment, carOxygen });
                })
        })
});

// {
//     "name":"ИВЛ",
//     "image":"https://picsum.photos/200",
//     "inventoryNum":001,
//     "checked":false,
//     "items":[
//         {
//             "name":"Аккумулятор",
//             "checked": false,
//             "quantity":2
//         },
//         {
//             "name":"Трубочка",
//             "checked": false,
//             "quantity":1
//         }
//     ],
//     "sortorder":0
// }




module.exports = router;