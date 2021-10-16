module.exports = function (app){
    const issueController = require("../controller/issuecontroller.js");

    app.post("/api/issutracker/issue", issueController.createIssue);
    app.put("/api/issutracker/issue/:id", issueController.updateIssue);
};