const express = require("express");
const router = express.Router();
const AddBusiness = require("../models/add_business.model");
const middleware = require("../middleware");

router.route("/Add").post(middleware.checkToken, (req, res) => {
    const add_business = AddBusiness({
      username: req.decoded.username,
      business_name: req.body.business_name,
    });
    add_business
      .save()
      .then((result) => {
        res.json({ data: result });
      })
      .catch((err) => {
        console.log(err), res.json({ err: err });
      });
  });

  
  router.route("/getbusinesslist").get(middleware.checkToken, (req, res) => {
    AddBusiness.find({ username: req.decoded.username }, (err, result) => {
      if (err) return res.json(err);
      return res.json({ data: result });
    });
  });
  

  module.exports = router;