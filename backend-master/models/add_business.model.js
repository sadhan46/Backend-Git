const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddBusiness = Schema({
  adminname: String,
  business_name: String,
});

module.exports = mongoose.model("AddBusiness", AddBusiness);