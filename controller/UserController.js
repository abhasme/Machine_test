const UserModel = require("../model/UserModel");
class UserController {
  static addUser(req, res) {
    const postData = req.body;
    UserModel.addUser(postData)
      .then((result) => res.status(result.code).json(result))
      .catch((err) =>res.status(err.code).json(err));
  }

  static getUser(req, res) {
    const getData = req.query;
    UserModel.getUser(getData)
      .then((result) => res.status(result.code).json(result))
      .catch((err) => res.status(err.code).json(err));
  }

  static updateUser(req, res) {
    const updateData = req.body;
    UserModel.updateUser(updateData)
      .then((result) => res.status(result.code).json(result))
      .catch((err) =>res.status(err.code).json(err));
  }

  static deleteUser(req, res) {
    const deleteData = req.body;
    UserModel.deleteUser(deleteData)
      .then((result) => res.status(result.code).json(result))
      .catch((err) =>res.status(err.code).json(err));
  }

 
}
module.exports = UserController;
