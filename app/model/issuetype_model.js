const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issuetypeSchema = new Schema({
    id: { type: String, unique: true, required: true },
    label: { type: String, enum:['issue','bug','task'], default: 'task' },
    color: { type: String },
    icon: { type: String },
},
{timestamps: true }
);

module.exports = mongoose.model("issuetype", issuetypeSchema);