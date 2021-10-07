  
const express = require("express");
const router = express.Router();
const AddProduct = require("../models/add_product.model");
const middleware = require("../middleware");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null,  req.params.id + ".jpg");
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6,
  },
});

router
  .route("/add/productImage/:id")
  .patch(middleware.checkToken, upload.array("img",6), (req, res) => {
    AddProduct.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          productImage: req.files.map(file => file.path),
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
    const add_product = AddProduct({
      username: req.decoded.username,
      product_name: req.body.product_name,
      product_details: req.body.product_details,
      unit:req.body.unit,
      currency:req.body.currency,
      quantity:req.body.quantity,
      mrp:req.body.mrp,
      sp:req.body.sp,
      per:req.body.per
    });
    add_product
      .save()
      .then((result) => {
        res.json({ data: result["_id"] });
      })
      .catch((err) => {
        console.log(err), res.json({ err: err });
      });
  });

  router.route("/getproducts").get(middleware.checkToken, (req, res) => {
    AddProduct.find({ username: req.decoded.username }, (err, result) => {
      if (err) return res.json(err);
      return res.json({ data: result });
    });
  });
  
router.route("/:username").get((req, res) => {
  AddProduct.find({ username: req.params.username }, (err, result) => {
    if (err) return res.json(err);
    return res.json({ data: result });
  });
});
    

module.exports = router;