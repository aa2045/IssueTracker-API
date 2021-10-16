const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportStrategy = require("./app/auth/passport.js");
//connect to db
const db = require("./app/model/index.js");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const app = express();
//public api, so  any cross-origin APIs and servers can access this resources.
var corsOptions = {
        origin: '*'
  };
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded());

//passport middleware

app.use(passport.initialize());
//passport config
passportStrategy(passport);
console.log("passports are done");
console.log("in here")
console.log(" routes are made")

// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

const projectroutes = require("./app/routes/projectroutes.js")(app);
const issueroutes = require("./app/routes/issueroutes.js")(app);
const userroutes = require("./app/routes/userroutes.js")(app);
console.log("issue routes are made");

// set port, listen for requests
const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//auth

module.exports = app;
