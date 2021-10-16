const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema  = new Schema(
    {
        firstname: {type: String, required: true},
        lastname: {type:String, required:true},
        email: {type:String, required:true},
        status: {type:String},
        password: {
            type: String,
            required: true,
          },
        designation: {type:String,
        enum:['developer', 'admin', 'tester'],
        default: 'developer'},
            
        favoriteProjects: [{ type: String }],

    }
);

module.exports = mongoose.model("users", userSchema);