const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Appointment = Schema({
  adminname: String,
  date:String,
  customer: String,
  customernumber:String,
  cart:[{
    type: mongoose.Schema.ObjectId,
    ref: 'Services'
  }],
  st:String,
  et:String,
  sum:String,
  sum_time:String,
},
{
    timestamps : true,
}
);

module.exports = mongoose.model("Appointment", Appointment);