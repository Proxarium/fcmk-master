const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
// const https = require('https');
// var fs = require('fs');
// const rateLimit = require("express-rate-limit");

// INITIALIZE APP
const app = express();
const sockets = require("./sockets/socket.js");

// INITIALIZE SOCKETS
// const sockets = require("./sockets/socket.js");
require("./models/User");
require("./models/TodoItem");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static('uploads'));

const db = require("./config/dbsecret").mongoURI;
require("./config/passport.js")(passport);

mongoose
    .connect(db)
    .then(() => console.log("Подключена DB"))
    .catch(err => console.log(err));

//ROUTES - ВСЕ ПУТИ//

//API
const ping = require("./routes/api/ping");
const auth = require("./routes/api/auth");
const todos = require("./routes/api/todos");
const users = require("./routes/api/users");
const dashboard = require("./routes/api/dashboard");
const brigade = require("./routes/api/brigade");
const equipment = require("./routes/api/equipment");

//ПОДКЛЮЧАЕМ ROUTES
app.use("/api/ping", ping);
app.use("/api/auth", auth);
app.use("/api/todos", todos);
app.use("/api/users", users);
app.use("/api/dashboard", dashboard);
app.use("/api/brigade", brigade);
app.use("/api/equipment", equipment);



app.use(express.static(path.join(__dirname, "public")));
const port = process.env.PORT || 5500;
app.listen(port, () => {
    console.log(`FCMK работает. Порт - ${port}`);
});

sockets.socketConnect();



