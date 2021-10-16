const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    projectId: {required: true, type: Schema.Types.ObjectId, ref: "projects"},
    createdbyId: {required: true, type: Schema.Types.ObjectId, ref: "users"},
    issueTypeId: {required: true, type: Schema.Types.ObjectId, ref: "issuetypes"},
    assignee: {type:String},
    priorityId: {required: true, type: Schema.Types.ObjectId, ref: "priority-type"},
    epicId: {type: String},
    description: {type: String},
    title:{type:String, required: true},
    statusId: {required: true, type: Schema.Types.ObjectId, ref: "kanbanboard"}, 

},

{ timestamps: true }

);

module.exports = mongoose.model("issues", issueSchema);