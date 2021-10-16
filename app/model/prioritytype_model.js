const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const priorityTypeSchema = new Schema({
    id: { type: String, unique: true, required: true },
    label: { type: String, enum: ['high','medium', 'low'], default: 'low' , required: true },
    color: { type: String },
    icon: { type: String },
});

module.exports = mongoose.model("priority-type", priorityTypeSchema);