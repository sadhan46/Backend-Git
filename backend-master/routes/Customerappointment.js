const express = require("express");
const router = express.Router();
const CustomerAppointment = require("../models/addappointment.model");
const AddShedule = require("../models/addshedule.model");
const Slots = require("../models/slots.model");
const middleware = require("../middleware");
var cors = require('cors');

router.use(cors());


router.route("/Slots/Add/:adminname/:date").patch(async (req, res) => {
  let slots = {};
  await Slots.findOne({ adminname : req.params.adminname, date:req.params.date}, (err, result) =>{

    if(err){
      slots = {};
    }
    if(result !=null){
      slots = result;
    }
  });
  Slots.findOneAndUpdate(
    {adminname : req.params.adminname,date : req.params.date},
    {
    $set: {
    adminname: req.params.adminname,
    slot1st: req.body.slot1st ? req.body.slot1st : slots.slot1st,
    slot1et: req.body.slot1et ? req.body.slot1et : slots.slot1et,
    slot2st: req.body.slot2st ? req.body.slot2st : slots.slot2st,
    slot2et: req.body.slot2et ? req.body.slot2et : slots.slot2et,
    slot3st: req.body.slot3st ? req.body.slot3st : slots.slot3st,
    slot3et: req.body.slot3et ? req.body.slot3et : slots.slot3et, 
    slot4st: req.body.slot4st ? req.body.slot4st : slots.slot4st,
    slot4et: req.body.slot4et ? req.body.slot4et : slots.slot4et,
    slot5st: req.body.slot5st ? req.body.slot5st : slots.slot5st,
    slot5et: req.body.slot5et ? req.body.slot5et : slots.slot5et,
    slot6st: req.body.slot6st ? req.body.slot6st : slots.slot6st,
    slot6et: req.body.slot6et ? req.body.slot6et : slots.slot6et,
    closedays:req.body.closedays ? req.body.closedays : slots.closedays,
    date:req.params.date,
    }
  },
  {
    new: true,
    upsert: true
  },
  (err, result) => {
    if (err) return res.json({err: err});
    if(result == null) return res.json({ data: []});
    else return res.json({data: result});
  }
  )
  /*
  const addappointment = CustomerAppointment({
    adminname: req.body.adminname,
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
    date:req.body.date,
    customername: req.body.customername,
    starttime:req.body.starttime,
    endtime:req.body.endtime,
    customeraddress:req.body.customeraddress,
    cutomercontactnumber:req.body.cutomercontactnumber,
    cutomerpincode:req.body.cutomerpincode,
    cartproducts:req.body.cartproducts,
    Total:req.body.Total
  });
  addappointment
    .save()
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      console.log(err), res.json({ err: err });
    });*/
});


router.route("/Add").post((req, res) => {
    const addappointment = CustomerAppointment({
      adminname: req.body.adminname,
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
      date:req.body.date,
      customername: req.body.customername,
      starttime:req.body.starttime,
      endtime:req.body.endtime,
      customeraddress:req.body.customeraddress,
      cutomercontactnumber:req.body.cutomercontactnumber,
      cutomerpincode:req.body.cutomerpincode,
      cartproducts:req.body.cartproducts,
      Total:req.body.Total
    });
    addappointment
      .save()
      .then((result) => {
        res.json({ data: result });
      })
      .catch((err) => {
        console.log(err), res.json({ err: err });
      });
  });

  //customer

  router.route("/getappointment/:adminname/:date").get((req, res) => {
    CustomerAppointment.findOne({ adminname: req.params.adminname,date:req.params.date},null, { sort: { createdAt : -1 } }, (err, result) => {
        if (err) return res.json({ err: err });
         else if (result == null) {
         AddShedule.findOne({ adminname: req.params.adminname }, (err, result) => {
           if (err) return res.json(err);
           return res.json({
            data: result
          } );
         });
        }
        else return res.json({ data: result
        });
    });
  });

  
  router.route("/getslots/:adminname/:date").get((req, res) => {
    Slots.findOne({ adminname: req.params.adminname,date:req.params.date},null, (err, result) => {
        if (err) return res.json({ err: err });
         else if (result == null) {
         AddShedule.findOne({ adminname: req.params.adminname }, (err, result) => {
           if (err) return res.json(err);
           return res.json({
            data: result
          } );
         });
        }
        else return res.json({ data: result
        });
    });
  });
  
  router.route("/getappointments/:date").get(middleware.checkToken, (req, res) => {
    CustomerAppointment.find({ adminname: req.decoded.adminname, date:req.params.date }, (err, result) => {
      if (err) return res.json(err);
      return res.json({ data: result });
    });
  });

  module.exports = router;