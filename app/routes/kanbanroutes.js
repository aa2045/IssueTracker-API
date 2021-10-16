module.exports =  function(app){
    const verifyToken = require("../auth/verify_token.js");
    const kanbanController = require("../controller/kanbanboardcontroller.js");
    app.post("/api/issutracker/kanbantype", verifyToken, kanbanController.createKanbanBoard);
    app.get("/api/issutracker/kanbantype/:id",verifyToken ,kanbanController.getKanbanById);
    app.get("/api/issutracker/kanbantype/", verifyToken ,kanbanController.getKanbanTypes);
    app.delete("/api/issutracker/kanbantype/:id", verifyToken .kanbanController.deleteKanbanBoard);
    app.put("/api/issutracker/kanbantype/:id", verifyToken,kanbanController.updateKanbanBoard);
}