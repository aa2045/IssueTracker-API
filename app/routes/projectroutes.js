module.exports = function (app) {
    const projectController = require("../controller/projectcontroller.js");
    
    // req.isAuthenticated is provided from the auth router
  //   app.get('/login', (req, res) => {
  //   console.log(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  // });

    app.post("/api/issutracker/project", projectController.createProject);
    app.put("/api/issutracker/project/:id", projectController.updateProject);
    app.delete("/api/issutracker/project/:id", projectController.deleteProject);
    app.get("/api/issutracker/project", projectController.getProjects);
    app.get("/api/issutracker/project/:key", projectController.getProjectsByKey);
    
};