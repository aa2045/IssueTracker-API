const dbConfig = require("../config/dbconfig");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db ={};
db.mongoose = mongoose;
db.url = dbConfig.url;
module.exports = db;