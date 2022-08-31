const user = require("../schema/userSchema")
const { sendEmail } = require("../helper/custome")
const { ObjectId } = require("mongoose").Types;
const fs = require('fs')
const excelJS = require("exceljs");
class UserModel {
  static async addUser(postData) {
    try {
      let response;
        if (!postData.user_name||!postData.user_email||!postData.user_phone||
        !postData.address||!postData.dob||!postData.gender||
        !postData.zipcode||!postData.state||!postData.city) {
        response = {
          code: 201,
          message: "Please fill all fields .",
          data: {},
        };
      } else {
        const userData = new user({ ...postData });

        await userData.save();
        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Registration");
        const filePath = '../upload';
        worksheet.columns = [
          { header: 'user_name', key: 'user_name' },
          { header: 'user_email', key: 'user_email' },
          { header: 'user_phone', key: 'user_phone' },
          { header: 'address', key: 'address' },
          { header: 'dob', key: 'dob' },
          { header: 'gender', key: 'gender' },
          { header: 'zipcode', key: 'zipcode' },
          { header: 'state', key: 'state' },
          { header: 'city', key: 'city' },

        ];
        worksheet.addRow(userData);
         await workbook.xlsx.writeFile(`${filePath}/users.xlsx`)

        sendEmail(
          postData.user_email,
          `Registration`,
          `<h5>Thank you'</h5>`,
          `${filePath}/users.xlsx`
        )
        response = {
          code: 201,
          message: "User insert successfully .",
          data: userData,
        };
      }

      return response;
    } catch (error) {
      console.log(error)
      return {
        code: 500,
        status: false,
        message: "Internal Server Error.",
      };
    }
  }

  static async getUser(getData) {
    try {
      let response;
      const listUser = await user.aggregate([
        { $match: { block: true } },
        {
          $project: {
            user_name: { $ifNull: ["$user_name", ""] },
            user_email: { $ifNull: ["$user_email", ""] },
            user_phone: { $ifNull: ["$user_phone", ""] },
            address: { $ifNull: ["$address", ""] },
            dob: { $ifNull: ["$dob", ""] },
            gender: { $ifNull: ["$gender", ""] },
            zipcode: { $ifNull: ["$zipcode", ""] },
            state: { $ifNull: ["$state", ""] },
            city: { $ifNull: ["$city", ""] },
            status: { $ifNull: ["$status", ""] },
          }
        }
      ])
      response = {
        code: 200,
        message: "User get successfully .",
        data: listUser,
      };

      return response;
    } catch (error) {
      return {
        code: 500,
        status: false,
        message: "Internal Server Error.",
      };
    }
  }

  static async updateUser(updateData) {
    try {
      let response;
      let updateUser;
      if (updateData.block === "block") {

        updateUser = await user.findByIdAndUpdate({ _id: updateData.userid }, { block: false })
      } else if (updateData.send === "send") {
        updateUser = await user.findOne({ _id: updateData.userid })
        console.log(updateUser)
        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Registration");
        const filePath = '../upload';
        worksheet.columns = [
          { header: 'user_name', key: 'user_name' },
          { header: 'user_email', key: 'user_email' },
          { header: 'user_phone', key: 'user_phone' },
          { header: 'address', key: 'address' },
          { header: 'dob', key: 'dob' },
          { header: 'gender', key: 'gender' },
          { header: 'zipcode', key: 'zipcode' },
          { header: 'state', key: 'state' },
          { header: 'city', key: 'city' },

        ];
         await workbook.xlsx.writeFile(`${filePath}/users.xlsx`)

        sendEmail(
          updateUser.user_email,
          `Registration`,
          `<h5>Thank you'</h5>`,
          `${filePath}/users.xlsx`
        )
        

      } else {
        updateUser = await user.findByIdAndUpdate({ _id: updateData.userid }, { ...updateData })
      }
      response = {
        code: 200,
        message: "User Update successfully .",
        data: updateUser,
      };

      return response;
    } catch (error) {
      return {
        code: 500,
        status: false,
        message: "Internal Server Error.",
      };
    }
  }
  static async deleteUser(deleteData) {
    try {
      let response;
      const deleteUser = await user.findOneAndDelete({ _id: (deleteData.userid) })
      response = {
        code: 200,
        message: "User Detelte successfully .",
        data: deleteUser,
      };

      return response;
    } catch (error) {
      return {
        code: 500,
        status: false,
        message: "Internal Server Error.",
      };
    }
  }
}
module.exports = UserModel;


