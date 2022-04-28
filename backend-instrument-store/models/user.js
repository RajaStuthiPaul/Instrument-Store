const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstname:{
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  orders: [
    {
      _id:{
        type:String
      },
      name:{
        type:String
      },
      price:{
        type:String
      },
      count:{
        type: Number
      },
      link:{
        type:String
      }
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
