const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        projectname:{type: String, required: true, unique: true},
        members: {type: [{type: String}]},
        projectKey: {type: String, required: true, unique: true},
        projectAdmin: {type: [{type: String}]}
},
{timestamps: true}
);

module.exports = mongoose.model("projects", projectSchema);