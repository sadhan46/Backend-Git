const express = require("express");
const router = express.Router();
const CustomerAppointment = require("../models/CustomerAppointment.model");
const SetShedule = require("../models/Set_shedule.model");
const TimeSlots = require("../models/Timeslots.model");
const middleware = require("../middleware");
var cors = require('cors');

router.use(cors());


router.route("/TimeSlots/Set/:adminname/:d").patch(async (req, res) => {
  let Timeslots = {};

   await TimeSlots.findOne({ adminname : req.params.adminname, d:req.params.d}, (err, result) =>{

    if(err){
      Timeslots = {};
    }
    if(result !=null){
      Timeslots = result;
    }
  });
  
  TimeSlots.findOneAndUpd(
    {adminname : req.params.adminname,d : req.params.d},
    {
    $set: {
    adminname: req.params.adminname,
    slot1st: req.body.slot1st ? req.body.slot1st : Timeslots.slot1st,
    slot1et: req.body.slot1et ? req.body.slot1et : Timeslots.slot1et,
    slot2st: req.body.slot2st ? req.body.slot2st : Timeslots.slot2st,
    slot2et: req.body.slot2et ? req.body.slot2et : Timeslots.slot2et,
    slot3st: req.body.slot3st ? req.body.slot3st : Timeslots.slot3st,
    slot3et: req.body.slot3et ? req.body.slot3et : Timeslots.slot3et, 
    slot4st: req.body.slot4st ? req.body.slot4st : Timeslots.slot4st,
    slot4et: req.body.slot4et ? req.body.slot4et : Timeslots.slot4et,
    slot5st: req.body.slot5st ? req.body.slot5st : Timeslots.slot5st,
    slot5et: req.body.slot5et ? req.body.slot5et : Timeslots.slot5et,
    slot6st: req.body.slot6st ? req.body.slot6st : Timeslots.slot6st,
    slot6et: req.body.slot6et ? req.body.slot6et : Timeslots.slot6et,
    cd:req.body.cd ? req.body.cd : Timeslots.cd,
    d:req.params.d,
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
 });

 //trying

 router.route("/TimeSlots/try/Set/:adminname/:d").patch(async (req, res) => {
   let Timeslots = {};
 
   await TimeSlots.findOne({ adminname : req.params.adminname, d:req.params.d}, (err, result) =>{
 
     if(err){
       Timeslots = {};
     }
     if(result !=null){
       Timeslots = result;
     }
   });
   
   TimeSlots.findOneAndUpd(
     {adminname : req.params.adminname,d : req.params.d},
     {
     $set: {
     adminname: req.params.adminname,
     slot1st: req.body.slot1st ? req.body.slot1st : Timeslots.slot1st,
     slot1et: req.body.slot1et ? req.body.slot1et : Timeslots.slot1et,
     slot2st: req.body.slot2st ? req.body.slot2st : Timeslots.slot2st,
     slot2et: req.body.slot2et ? req.body.slot2et : Timeslots.slot2et,
     slot3st: req.body.slot3st ? req.body.slot3st : Timeslots.slot3st,
     slot3et: req.body.slot3et ? req.body.slot3et : Timeslots.slot3et, 
     slot4st: req.body.slot4st ? req.body.slot4st : Timeslots.slot4st,
     slot4et: req.body.slot4et ? req.body.slot4et : Timeslots.slot4et,
     slot5st: req.body.slot5st ? req.body.slot5st : Timeslots.slot5st,
     slot5et: req.body.slot5et ? req.body.slot5et : Timeslots.slot5et,
     slot6st: req.body.slot6st ? req.body.slot6st : Timeslots.slot6st,
     slot6et: req.body.slot6et ? req.body.slot6et : Timeslots.slot6et,
     cd:req.body.cd ? req.body.cd : Timeslots.cd,
     d:req.params.d,
     }
   },
   {
     new: true,
     upsert: true
   },
   (err, result) => {
     if (err) return res.json({err: err});
     if(result == null) return res.json({ data: []});
     else {
      const CustomerAppointment = CustomerAppointment({
       adminname: req.params.adminname,
       d: req.params.d,
       customer_name: req.body.customer_name,
       st: req.body.st,
       et: req.body.et,
       customer_mobile_number: req.body.customer_mobile_number,
       cart: req.body.cart,
       sum: req.body.sum,
       sum_time: req.body.sum_time
     });
     CustomerAppointment
       .save()
       .then((result) => {
         res.json({ data: result });
       })
       .catch((err) => {
         console.log(err), res.json({ err: err });
       });
         }}
   );
  });


router.route("/Set/:adminname/:d").post((req, res) => {
    const CustomerAppointment = CustomerAppointment({
      adminname: req.params.adminname,
      d: req.params.d,
      customer_name: req.body.customer_name,
      st: req.body.st,
      et: req.body.et,
      customer_mobile_number: req.body.customer_mobile_number,
      cart: req.body.cart,
      sum: req.body.sum,
      sum_time: req.body.sum_time
    });
    CustomerAppointment
      .save()
      .then((result) => {
        res.json({ data: result });
      })
      .catch((err) => {
        console.log(err), res.json({ err: err });
      });
  });

  //customer

  router.route("/getTimeslots/:adminname/:d").get((req, res) => {
    TimeSlots.findOne({ adminname: req.params.adminname,d:req.params.d},null, (err, result) => {
        if (err) return res.json({ err: err });
         else if (result == null) {
         SetShedule.findOne({ adminname: req.params.adminname }, (err, result) => {
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
  
  router.route("/getCustomerAppointments/:d").get(middleware.checkToken, (req, res) => {
    CustomerAppointment.find({ adminname: req.decoded.adminname, d:req.params.d }, (err, result) => {
      if (err) return res.json(err);
      return res.json({ data: result });
    });
  });

  router.route("/try1/getCustomerAppointments/:d").get(middleware.checkToken, (req, res) => {
    CustomerAppointment.find({ adminname: req.decoded.adminname, d:req.params.d }).popul('cart').exec(function(err, result) {
      if(err) return res.json(err);
      else res.json({ data: result });
    }) 
  });

  module.exports = router;