// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// //creating schema
// const issueSchema = new Schema(
//     {
//         title: {type: String, required: true},
//         description: {type: String, required: true},
//         createdon:Date,
//         updatedon: {
//             type: Date,
//             default: Date.now,
//             },
//         createdby: {type: String},
//         assignedto: String,
//         issuetype: {type: String,
//             enum : ['bug','task'],
//             default: 'task'},
//         status: Boolean,
//         priority:{ type: String,
//         enum : ['high','medium', 'low'],
//         default: 'low'},
//     }
// );

// //compiling issue model and issue schema
// const Issue = mongoose.model("Issue", issueSchema);

// const projectSchema = new Schema({
//     projectname: {type: String, required:true},
//     issues: [issueSchema],
// });
// const Project = mongoose.model("Projects", projectSchema);


// const userSchema = new Schema({
//     username: {type: String, required:true},
//     projects: [projectSchema],
// })
// const User = mongoose.model("Users", userSchema);

// exports.Issue = Issue;
// exports.Project = Project;
// exports.User = User;
// console.log("bug_track is success");

