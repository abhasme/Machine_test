const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  user_name: { type: String, default : '' },
  user_email: { type: String,default : ''},
  user_phone: { type: String, default : ''},
  address: { type: String,default : ''},
  dob: { type: String,default : ''},
  gender: { type: String , default : ''},
  zipcode: { type: String , default : ''},
  state: { type: String , default : ''},
  city: { type: String , default : ''},
  block: {type: Boolean, default : true},
  status: {type: Boolean, default : true},
  created_at: { type: Schema.Types.Date },
  updated_at: { type: Schema.Types.Date },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
