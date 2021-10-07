const express = require("express");
const router = express.Router();
const AdminProfile = require("../models/Adminprofile.model");
const middleware = require("../middleware");
const config = require("../config");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
var cors = require('cors');

router.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null,req.decoded.adminname + ".jpg");
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6,
  },
  // fileFilter: fileFilter,
});

//adding and update Adminprofile image
router
  .route("/add/image")
  .patch(middleware.checkToken, upload.array("img",6), (req, res) => {
    AdminProfile.findOneAndUpdate(
      { adminname: req.decoded.adminname },
      {
        $set: {
          img: req.files.map(file => file.path),
        },
      },
      { new: true },
      (err, Adminprofile) => {
        if (err) return res.status(500).send(err);
        const response = {
          message: "image added successfully updated",
          data: Adminprofile,
        };
        return res.status(200).send(response);
      }
    );
  });

router.route("/register").post(/*middleware.checkToken, */(req, res) => {
  const Adminprofile = AdminProfile({
    adminname: req.body.adminname,
    address: req.body.address,
    AdminMobile: req.body.AdminMobile,
    date: req.body.date,
  });
  Adminprofile
    .save()
    .then(() => {
      // here we implement the JWT token functionality
       let token = jwt.sign({adminname:req.body.adminname}, config.key, {});

       return res.status(200).json({token: token,msg: "success",});
    })
    .catch((err) => {
      return res.status(400).json({ err: err });
    });
});

// Check AdminProfile data

router.route("/checkAdminProfile").get(middleware.checkToken, (req, res) => {
  AdminProfile.findOne({ adminname: req.decoded.adminname }, (err, result) => {
    if (err) return res.json({ err: err });
    else if (result == null) {
      return res.json({ status: false, adminname: req.decoded.adminname });
    } else {
      return res.json({ status: true, adminname: req.decoded.adminname });
    }
  });
});


router.route("/login").post((req, res) => {
  AdminProfile.findOne({ AdminMobile: req.body.AdminMobile }, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    if (result === null) {
      return res.status(403).json("Not registered");
    }
    if (result.adminname !== null) {
      // here we implement the JWT token functionality
      let token = jwt.sign({adminname:result.adminname}, config.key, {});

      res.json({
        token: token,
        msg: "success",
      });
    } else {
      res.status(403).json("login failed");
      console.log(result.password);
    }
  });
});

router.route("/getData").get(middleware.checkToken, (req, res) => {
  AdminProfile.findOne({ adminname: req.decoded.adminname }, (err, result) => {
    if (err) return res.json({ err: err });
    if (result == null) return res.json({ data: [] });
    else return res.json({ data: result });
  });
});

router.route("/update").patch(middleware.checkToken, async (req, res) => {
  let Adminprofile = {};
  await AdminProfile.findOne({ adminname: req.decoded.adminname }, (err, result) => {
    if (err) {
      Adminprofile = {};
    }
    if (result != null) {
      Adminprofile = result;
    }
  });
  AdminProfile.findOneAndUpdate(
    { adminname: req.decoded.adminname },
    {
      $set: {
        address: req.body.address ? req.body.address : Adminprofile.address, 
        services: req.body.services ? req.body.services : Adminprofile.services,
        st: req.body.st ? req.body.st : Adminprofile.st,
        sum: req.body.sum ? req.body.sum : Adminprofile.sum,
        date: req.body.date ? req.body.date : Adminprofile.date,
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


router.route("/update1").patch(middleware.checkToken, async (req, res) => {
  let Adminprofile = {};
  await AdminProfile.findOne({ adminname: req.decoded.adminname }, (err, result) => {
    if (err) {
      Adminprofile = {};
    }
    if (result != null) {
      Adminprofile = result;
    }
  });
  AdminProfile.findOneAndUpdate(
    { adminname: req.decoded.adminname },
    {
      $set: {
        address: req.body.address ? req.body.address : Adminprofile.address, 
        services: req.body.services
          ? req.body.services
          : Adminprofile.services,
        st: req.body.st ? req.body.st : Adminprofile.st,
        sum: req.body.sum ? req.body.sum : Adminprofile.sum,
        date: req.body.date ? req.body.date : Adminprofile.date, //about:""
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

router.route("/search/:adminname").get((req, res) => {
  AdminProfile.find({ adminname: {$regex : "^" + req.params.adminname, $options: 'i'} }, (err, result) => {
    if (err) return res.json({ err: err });
    if (result == null) return res.json({ data: [] });
    else return res.json({ data: result });
  }).limit(20);
});

module.exports = router;