module.exports =  function(app){
    const verifyToken = require("../auth/verify_token.js");
    const issuetype_routes = require("../controller/issue_typecontroller.js");

    app.post("/api/issutracker/issuetype", verifyToken,issuetype_routes.createIssueType);
    app.get("/api/issutracker/issuetype/:key",verifyToken, issuetype_routes.getIssueTypeById);
    app.get("/api/issutracker/issuetype/", verifyToken, issuetype_routes.getIssueType);
    app.delete("/api/issutrackerissuetype/:id", verifyToken, issuetype_routes.deleteIssueTypes);
    app.put("/api/issutrackerissuetype/:id", verifyToken , issuetype_routes.updateIssueType);
}