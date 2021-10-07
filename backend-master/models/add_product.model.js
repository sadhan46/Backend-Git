const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddProduct = Schema({
  username: String,
  product_name: String,
  product_details: String,
  unit: String,
  currency: String,
  quantity: String,
  productImage: {
    type: Array,
    default: "",
  },
  mrp: {
    type: String,
    default: "",
  },
  per: {
    type: String,
    default: "1",
  },
  sp: {
    type: String,
    default: "",
  },
  counter: {
    type: Number,
    default:1,
  },
  addProduct:{
    type:Boolean,
    default:false,
  }
});

module.exports = mongoose.model("AddProduct", AddProduct);