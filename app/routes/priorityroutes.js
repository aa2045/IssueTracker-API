module.exports =  function(app){
    const prioritycontroller = require("../controller/prioritycontroller.js");
    const verifyToken = require("../auth/verify_token.js");

    app.post("/api/issutracker/priority", verifyToken, prioritycontroller.createPriority);
    app.get("/api/issutrackerpriority/:key",verifyToken, prioritycontroller.getPriorityById);
    app.get("/api/issutracker/priority/",verifyToken , prioritycontroller.getPriority);
    app.delete("/api/issutrackerpriority/:id",verifyToken , prioritycontroller.deletePriority);
    app.put("/api/issutracker/priority/:id", verifyToken, prioritycontroller.updatePriority);
}