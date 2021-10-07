const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddAppointment = Schema({
  adminname: String,
  slot1st: {
    type: String,
    default: "",
  },
  slot1et: {
    type: String,
    default: "",
  },
  slot2st: {
    type: String,
    default: "",
  },
  slot2et: {
    type: String,
    default: "",
  },
  slot3st: {
    type: String,
    default: "",
  },
  slot3et: {
    type: String,
    default: "",
  },
  slot4st: {
    type: String,
    default: "",
  },
  slot4et: {
    type: String,
    default: "",
  },
  slot5st: {
    type: String,
    default: "",
  },
  slot5et: {
    type: String,
    default: "",
  },
  slot6st: {
    type: String,
    default: "",
  },
  slot6et: {
    type: String,
    default: "",
  },
  date:String,
  customername: String,
  customeraddress:String,
  customercontactnumber:String,
  customerpinCode: String,
  cartproducts:{
      type:Array,
  },
  starttime:String,
  endtime:String,
  Total:String,
  closedays:{
    type:Array
  }
},
{
    timestamps : true,
}
);

module.exports = mongoose.model("AddAppointment", AddAppointment);