const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Profile = Schema(
  {
    adminname: {
      type: String,
      required: true,
      unique: true,
    },
    address: String,
    contact_number:  {
      type: String,
      required: true,
      unique: true,
    },
    services:  {
      type: String,
      default: "0",
    },
    st: {
      type: String,
      default: "0:0",
    },
    total: {
      type: String,
      default: "0",
    },
    date: String,
    img: {
      type:Array,
      default: "",
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Profile", Profile);