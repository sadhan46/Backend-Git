const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Slots = Schema({
  username: String,
  slot_1_starting_time: {
    type: String,
    default: "",
  },
  slot_1_ending_time: {
    type: String,
    default: "",
  },
  slot_2_starting_time: {
    type: String,
    default: "",
  },
  slot_2_ending_time: {
    type: String,
    default: "",
  },
  slot_3_starting_time: {
    type: String,
    default: "",
  },
  slot_3_ending_time: {
    type: String,
    default: "",
  },
  slot_4_starting_time: {
    type: String,
    default: "",
  },
  slot_4_ending_time: {
    type: String,
    default: "",
  },
  slot_5_starting_time: {
    type: String,
    default: "",
  },
  slot_5_ending_time: {
    type: String,
    default: "",
  },
  slot_6_starting_time: {
    type: String,
    default: "",
  },
  slot_6_ending_time: {
    type: String,
    default: "",
  },
  slot_value : String,
  date : String,
  close_days:{
    type: Array
  }
}
);

module.exports = mongoose.model("Slots", Slots);