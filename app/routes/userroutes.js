const verifyToken = require("../auth/verify_token.js");
module.exports = function (app) {
    const userController = require("../controller/usercontroller.js");
    app.post("/api/issutracker/user", userController.createUser);
    app.post("/api/issutracker/login", userController.loginUser);
    app.get("/api/issutracker/user", verifyToken,userController.getUsers);
    app.get("/api/issutracker/user/:email", verifyToken, userController.getUsersByEmail);
}