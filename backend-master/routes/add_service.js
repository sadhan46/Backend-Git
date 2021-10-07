
const express = require("express");
const router = express.Router();
const AddService = require("../models/add_service.model");
const middleware = require("../middleware");
var cors = require('cors');

router.use(cors());

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + req.params.id + ".jpg");
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6,
  },
});

router
  .route("/add/serviceImage/:id")
  .patch(middleware.checkToken, upload.array("img",6), (req, res) => {
    AddService.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          serviceImage: req.files.map(file => file.path),
        },
      },
      { new: true },
      (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
      }
    );
  });

router.route("/Add").post(middleware.checkToken, (req, res) => {
    const add_service = AddService({
      adminname: req.decoded.adminname,
      serviceName: req.body.serviceName,
      currency:req.body.currency,
      Cost:req.body.Cost,
      hr:req.body.hr,
      min:req.body.min,
    });
    add_service
      .save()
      .then((result) => {
        res.json({ data: result });
      })
      .catch((err) => {
        console.log(err), res.json({ err: err });
      });
  });

  
router.route("/delete/:id").delete(middleware.checkToken, (req, res) => {
  AddService.findOneAndDelete(
    {
      $and: [{ adminname: req.decoded.adminname }, { _id: req.params.id }],
    },
    (err, result) => {
      if (err) return res.json(err);
      else if (result) {
        console.log(result);
        return res.json("Service deleted");
      }
      return res.json("Service not deleted");
    }
  );
});

  router.route("/getservices").get(middleware.checkToken, (req, res) => {
    AddService.find({ adminname: req.decoded.adminname }, (err, result) => {
      if (err) return res.json(err);
      return res.json({ data: result });
    });
  });

  router.route("/:adminname").get((req, res) => {
    AddService.find({ adminname: req.params.adminname }, (err, result) => {
      if (err) return res.json(err);
      return res.json({ data: result });
    });
  });
  

module.exports = router;