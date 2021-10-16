const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const mongoose = require("mongoose");
const userModel = require('../model/user_model');
const secretkey = require("./secretkey");

 const passportStrategy = (passport) =>{
    const options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey  = secretkey;
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        userModel.findById(jwt_payload.id)
        .then((user) => {
            if (user) {
                return done(null, user);
              }
              return done(null, false);
        })
        .catch((err) => console.log(err));
    })
    );

};
module.exports = passportStrategy;