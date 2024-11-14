//СОКЕТ
const io = require('socket.io')({
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });




var connectedCP = [];
var connectedAPP = [];

module.exports = {
    "socketConnect": () => {
        
        // ПОДПИСЬ НА ОБНОВЛЕНИЯ ПАНЕЛИ УПРАЛЕНИЯ
        io.on("connection", (socket) => {
            socket.on("source", (payload) => {
                if(payload == "panel"){
                    connectedCP.push(socket);
                    console.log('Подключеные панели управления - ' + connectedCP.length);
                    let message = {
                        type: "CONNECTED"
                    }
                    socket.emit("message", message);
                }
                // if(payload == "app"){
                //     connectedAPP.push(socket);
                //     console.log('Подключеные приложения - ' + connectedAPP.length);
                // }
            });

            socket.on("subscribeToTimer", (interval) => {
                console.log('client is subscribing to timer with interval ', interval);
                //console.log(client);
                setInterval(() => {
                    socket.emit("timer", new Date());
                }, interval);
            });

            socket.on("disconnect", (disconnectedSocket) => {
                console.log('Сокет отключился');
                console.log(socket.id);
                var indexCP = connectedCP.indexOf(socket);
                if (indexCP > -1) {
                    connectedCP.splice(indexCP, 1);
                }
                var indexAPP = connectedAPP.indexOf(socket);
                if (indexAPP > -1) {
                    connectedAPP.splice(indexAPP, 1);
                }
                console.log('Подключеные панели управления - ' + connectedCP.length);
                console.log('Подключеные приложения - ' + connectedAPP.length);
            });
        });
        // ЗАПУСК СОКЕТА ДЛЯ ПАНЕЛИ УПРАВЛЕНИЯ
        const cpport = 6500;
        io.listen(cpport);
        console.log('Открыт сокет для панели управления - ', cpport);

        // ЗАПУСК СОКЕТА ДЛЯ ПРИЛОЖЕНИЯ
        const appport = 9000;
        io.listen(appport);
        console.log('Открыт сокет для приложения - ', appport);
    },
    "updateOrderById" : (orderNum) => {
        for(let i in connectedCP){
            let message = {
                type: "UPDATE_ORDER_BY_ID",
                data: orderNum
            }
            connectedCP[i].emit("message", message);
        }
    },
    "updateOrder": (orderNum) => {
        for(let i in connectedCP){
            let message = {
                type: "UPDATE_ORDER",
                data: orderNum
            }
            connectedCP[i].emit("message", message);
        }
    },
    "newReport": (reportId) => {
        for(let i in connectedCP){
            let message = {
                type: "NEW_REPORT",
                data: reportId
            }
            console.log('EMITTING REPORT')
            connectedCP[i].emit("message", message);
        }
    },
    "completeReport": (reportId) => {
        for(let i in connectedCP){
            let message = {
                type: "COMPLETE_REPORT",
                data: reportId
            }
            console.log('EMITTING REPORT')
            connectedCP[i].emit("message", message);
        }
    },
    
    "orderDelivered": (orderNum, id, time, paid, apistatus, clientstatus, statushistory) => {
        for(let i in connectedCP){
            let message = {
                type: "ORDER_DELIVERED",
                data: {
                    orderNum: orderNum,
                    id: id,
                    time: time,
                    paid: paid,
                    apistatus: apistatus,
                    clientstatus: clientstatus,
                    statushistory: statushistory
                }
            }
            connectedCP[i].emit("message", message);
        }
    },
    "newReserve": (reserve) => {
        for(let i in connectedCP){
            let message = {
                type: "NEW_RESERVE",
                data: reserve._id
            }
            connectedCP[i].emit("message", message);
        }
    },
    "informCourier": (courier_id) => {
        for(let i in connectedCP){
            let message = {
                type: "NEW_COURIER_ORDER",
                data: courier_id
            }
            connectedCP[i].emit("message", message);
        }
    },
    "updateCourier": (courier_id, order_id) => {
        for(let i in connectedCP){
            let message = {
                type: "UPDATE_COURIER_ORDER",
                data: {courier_id:courier_id,order_id:order_id}
            }
            connectedCP[i].emit("message", message);
        }
    },
    "updateOrderPayments": (order) => {
        for(let i in connectedCP){
            let message = {
                type: "UPDATE_ORDER_PAYMENTS",
                data: order.id
            }
            connectedCP[i].emit("message", message);
        }
    }
}
