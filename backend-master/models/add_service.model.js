const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddService = Schema({
  adminname: String,
  service: String,
  currency: String,
  serviceCost: String,
  hr: {
    type: String,
    default:"0",
  },
  min:String,
  counter: {
    type: Number,
    default:1,
  },
  addProduct:{
    type:Boolean,
    default:false,
  }
});

module.exports = mongoose.model("AddService", AddService);