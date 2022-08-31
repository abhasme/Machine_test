const UserController = require("../controller/UserController");
module.exports = (app) => {
  app.post("/add-user", UserController.addUser);
  app.get("/get-user", UserController.getUser);
  app.put("/update-user", UserController.updateUser);
  app.delete("/delete-user", UserController.deleteUser);
};
