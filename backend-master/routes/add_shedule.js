const express = require("express");
const router = express.Router();
const Addtimings = require("../models/Addtimings.model");
const middleware = require("../middleware");

var cors = require('cors');

router.use(cors());


router.route("/Add").post(middleware.checkToken, (req, res) => {
    const Addtimings = Addtimings({
      adminname: req.decoded.adminname,
      slot1st: req.body.slot1st ,
      slot1et: req.body.slot1et,
      slot2st: req.body.slot2st,
      slot2et: req.body.slot2et,
      slot3st: req.body.slot3st,
      slot3et: req.body.slot3et, 
      slot4st: req.body.slot4st,
      slot4et: req.body.slot4et,
      slot5st: req.body.slot5st,
      slot5et: req.body.slot5et,
      slot6st: req.body.slot6st,
      slot6et: req.body.slot6et,
      closedays:req.body.closedays,
    });
    Addtimings
      .save()
      .then((result) => {
        res.json({ data: result });
      })
      .catch((err) => {
        console.log(err), res.json({ err: err });
      });
  });
  
  
router.route("/checkShedule").get(middleware.checkToken, (req, res) => {
  Addtimings.findOne({ adminname: req.decoded.adminname }, (err, result) => {
    if (err) return res.json({ err: err });
    else if (result == null) {
      return res.json({ status: false, adminname: req.decoded.adminname });
    } else {
      return res.json({ status: true, adminname: req.decoded.adminname });
    }
  });
});

router.route("/getShedule").get(middleware.checkToken, (req, res) => {
  Addtimings.findOne({ adminname: req.decoded.adminname }, (err, result) => {
    if (err) return res.json({ err: err });
    if (result == null) return res.json({ data: [] });
    else return res.json({ data: result });
  });
});

  
router.route("/update").patch(middleware.checkToken, async (req, res) => {
  let shedule = {};
  await Addtimings.findOne({ adminname: req.decoded.adminname }, (err, result) => {
    if (err) {
      shedule = {};
    }
    if (result != null) {
      shedule = result;
    }
  });
  Addtimings.findOneAndUpdate(
    { adminname: req.decoded.adminname },
    {
      $set: {
        slot1st: req.body.slot1st ? req.body.slot1st : shedule.slot1st,
        slot1et: req.body.slot1et ? req.body.slot1et : shedule.slot1et,
        slot2st: req.body.slot2st ? req.body.slot2st : shedule.slot2st,
        slot2et: req.body.slot2et ? req.body.slot2et : shedule.slot2et,
        slot3st: req.body.slot3st ? req.body.slot3st : shedule.slot3st,
        slot3et: req.body.slot3et ? req.body.slot3et : shedule.slot3et, 
        slot4st: req.body.slot4st ? req.body.slot4st : shedule.slot4st,
        slot4et: req.body.slot4et ? req.body.slot4et : shedule.slot4et,
        slot5st: req.body.slot5st ? req.body.slot5st : shedule.slot5st,
        slot5et: req.body.slot5et ? req.body.slot5et : shedule.slot5et,
        slot6st: req.body.slot6st ? req.body.slot6st : shedule.slot6st,
        slot6et: req.body.slot6et ? req.body.slot6et : shedule.slot6et,
        closedays:req.body.closedays ? req.body.closedays : shedule.closedays,

      },
    },
    { new: true },
    (err, result) => {
      if (err) return res.json({ err: err });
      if (result == null) return res.json({ data: [] });
      else return res.json({ data: result });
    }
  );
});
  

  module.exports = router;