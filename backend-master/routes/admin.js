const express = require("express");
const Admin = require("../models/Admin.model");
const AdminProfile = require("../models/AdminProfile.model");
const config = require("../config");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");
const router = express.Router();

/*
router.route("/:adminname").get(middleware.checkToken, (req, res) => {
  Admin.findOne({ adminname: req.params.adminname }, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    return res.json({
      data: result,
      adminname: req.params.adminname,
    });
  });
});*/

router.route("/checkadminname/:adminname").get((req, res) => {
  AdminProfile.findOne({ adminname: {$regex : "^" + req.params.adminname + "$", $options: 'i'} }, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    if (result !== null) {
      return res.json({
        Status: true,
      });
    } else
      return res.json({
        Status: false,
      });
  });
});

/*
router.route("/signin").post((req, res) => {
  Admin.findOne({ adminMobile: req.body.adminMobile }, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    if (result === null) {
      return res.status(403).json("Not signuped");
    }
    if (result.adminname !== null) {
      // here we implement the JWT token functionality
      let token = jwt.sign({adminname:result.adminname}, config.key, {});

      res.json({
        token: token,
        msg: "success",
      });
    } else {
      res.status(403).json("signin failed");
      console.log(result.password);
    }
  });
});

router.route("try1/signin").post((req, res) => {
  Admin.findOne({ adminMobile: req.body.adminMobile }, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    if (result === null) {
      return res.status(403).json("Not signuped");
    }
    if (result.adminname !== null) {
      // here we implement the JWT token functionality
      let token = jwt.sign({adminname:result.adminname}, config.key, {
        expiresIn: "24h",
      });
      res.status(200).json({
        token: token,
        msg: "success",
      });
    } else {
      res.status(403).json("signin failed");
      console.log(req.body.adminMobile);
    }
  });
});



router.route("/signup").post((req, res) => {
  console.log("inside the signup");
  const Admin = new Admin({
    adminname: req.body.adminname,
    password: req.body.password,
    email: req.body.email,
  });
  Admin
    .save()
    .then(() => {
      console.log("Admin signuped");
      res.status(200).json({ msg: "Admin Successfully signedup" });
    })
    .catch((err) => {
      res.status(403).json({ msg: err });
    });
});

router.route("/try/signup").post((req, res) => {
  console.log("inside the signup");
  const Admin = new Admin({
    adminname: req.body.adminname,
    adminMobile: req.body.adminMobile,
  });
  Admin
    .save()
    .then(() => {
      console.log("Admin signuped");
      res.status(200).json({ msg: "Admin Successfully signuped" });
    })
    .catch((err) => {
      res.status(403).json({ msg: err });
    });
});

  
router.route("/update/:adminname").patch(middleware.checkToken, (req, res) => {
    Admin.findOneAndUpdate(
      { adminname: req.params.adminname },
      { $set: { password: req.body.password } },
      (err, result) => {
        if (err) return res.status(500).json({ msg: err });
        const msg = {
          msg: "password successfully updated",
          adminname: req.params.adminname,
        };
        return res.json(msg);
      }
    );
  });

  
router.route("/remove/:adminname").delete(middleware.checkToken, (req, res) => {
    Admin.findOneAndDelete({ adminname: req.params.adminname }, (err, result) => {
      if (err) return res.status(500).json({ msg: err });
      const msg = {
        msg: "Admin deleted",
        a: req.params.adminname,
      };
      return res.json(msg);
    });
  });

  
  router.route("/getappointment").get(middleware.checkToken, (req, res) => {
    AddAppointment.find({ adminname: req.decoded.adminname }, (err, result) => {
      if (err) return res.json(err);
      return res.json({ data: result });
    });
  });
  
*/
  
module.exports = router;