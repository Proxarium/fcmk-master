const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
// const Customer = mongoose.model("customers");
const keys = require("./dbsecret");

let opts = {};
let optsWeb = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
optsWeb.jwtFromRequest = ExtractJwt.fromHeader('authorization'),
opts.secretOrKey = keys.secretOrKey;
optsWeb.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );


// ####### Пользователи - переименовать в админов и юзеров

//   passport.use('web',
//     new JwtStrategy(optsWeb, (jwt_payload, done) => {
//       Customer.findById(jwt_payload.id)
//         .then(customer => {
//           if (customer) {
//             return done(null, customer);
//           }
//           return done(null, false);
//         })
//         .catch(err => console.log(err));
//     })
//   );
};
