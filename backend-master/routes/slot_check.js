const express = require("express");
const router = express.Router();
const Adminname = require("../models/Adminname.model");
const AddShedule = require("../models/addshedule.model");
const Slots = require("../models/slots.model");
const middleware = require("../middleware");
var cors = require('cors');

router.use(cors());

router.route("/s0s/:adminname/:date/:slot1st").get((req, res) => {
    Slots.findOne({
        adminname: req.params.adminname,
        date: req.params.date,
        slot1st: req.params.slot1st
    }, null, (err, result) => {
        if (err) return res.json({ err: err });
        else if (result !== null) {
            return res.json({
                Status: true,
            });
        }
        else if (result == null) {
            AddShedule.findOne({ adminname: req.params.adminname, slot1st: req.params.slot1st }, (err, result) => {
                if (err) return res.json(err);
                else if (result !== null) {
                    return res.json({
                        Status: true,
                    });
                }
                else return res.json({ Status: false });
            });
        }
        else return res.json({
            Status: false,
        });
    });
});

router.route("/s1e/:adminname/:date/:slot1et").get((req, res) => {
    Slots.findOne({
        adminname: req.params.adminname,
        date: req.params.date,
        slot1et: req.params.slot1et
    }, null, (err, result) => {
        if (err) return res.json({ err: err });
        else if (result !== null) {
            return res.json({
                Status: true,
            });
        }
        else if (result == null) {
            AddShedule.findOne({ adminname: req.params.adminname, slot1et: req.params.slot1et }, (err, result) => {
                if (err) return res.json(err);
                else if (result !== null) {
                    return res.json({
                        Status: true,
                    });
                }
                else {
                    return res.json({ Status: false });
                }
            });
        }
        else {
            console.log("error 0");
            return res.json({
                Status: false,
            });
        }
    });
});

router.route("/s2s/:adminname/:date/:slot2st").get((req, res) => {
    Slots.findOne({
        adminname: req.params.adminname,
        date: req.params.date,
        slot2st: req.params.slot2st
    }, null, (err, result) => {
        if (err) return res.json({ err: err });
        else if (result !== null) {
            return res.json({
                Status: true,
            });
        }
        else if (result == null) {
            AddShedule.findOne({ adminname: req.params.adminname, slot2st: req.params.slot2st }, (err, result) => {
                if (err) return res.json(err);
                else if (result !== null) {
                    return res.json({
                        Status: true,
                    });
                }
                else return res.json({ Status: false });
            });
        }
        else return res.json({
            Status: false,
        });
    });
});

router.route("/s3e/:adminname/:date/:slot2et").get((req, res) => {
    Slots.findOne({
        adminname: req.params.adminname,
        date: req.params.date,
        slot2et: req.params.slot2et
    }, null, (err, result) => {
        if (err) return res.json({ err: err });
        else if (result !== null) {
            return res.json({
                Status: true,
            });
        }
        else if (result == null) {
            AddShedule.findOne({ adminname: req.params.adminname, slot2et: req.params.slot2et }, (err, result) => {
                if (err) return res.json(err);
                else if (result !== null) {
                    return res.json({
                        Status: true,
                    });
                }
                else return res.json({ Status: false });
            });
        }
        else return res.json({
            Status: false,
        });
    });
});

router.route("/s4s/:adminname/:date/:slot3st").get((req, res) => {
    Slots.findOne({
        adminname: req.params.adminname,
        date: req.params.date,
        slot3st: req.params.slot3st
    }, null, (err, result) => {
        if (err) return res.json({ err: err });
        else if (result !== null) {
            return res.json({
                Status: true,
            });
        }
        else if (result == null) {
            AddShedule.findOne({ adminname: req.params.adminname, slot3st: req.params.slot3st }, (err, result) => {
                if (err) return res.json(err);
                else if (result !== null) {
                    return res.json({
                        Status: true,
                    });
                }
                else return res.json({ Status: false });
            });
        }
        else return res.json({
            Status: false,
        });
    });
});

router.route("/s5e/:adminname/:date/:slot3et").get((req, res) => {
    Slots.findOne({
        adminname: req.params.adminname,
        date: req.params.date,
        slot3et: req.params.slot3et
    }, null, (err, result) => {
        if (err) return res.json({ err: err });
        else if (result !== null) {
            return res.json({
                Status: true,
            });
        }
        else if (result == null) {
            AddShedule.findOne({ adminname: req.params.adminname, slot3et: req.params.slot3et }, (err, result) => {
                if (err) return res.json(err);
                else if (result !== null) {
                    return res.json({
                        Status: true,
                    });
                }
                else return res.json({ Status: false });
            });
        }
        else return res.json({
            Status: false,
        });
    });
});

router.route("/s6s/:adminname/:date/:slot4st").get((req, res) => {
    Slots.findOne({
        adminname: req.params.adminname,
        date: req.params.date,
        slot4st: req.params.slot4st
    }, null, (err, result) => {
        if (err) return res.json({ err: err });
        else if (result !== null) {
            return res.json({
                Status: true,
            });
        }
        else if (result == null) {
            AddShedule.findOne({ adminname: req.params.adminname, slot4st: req.params.slot4st }, (err, result) => {
                if (err) return res.json(err);
                else if (result !== null) {
                    return res.json({
                        Status: true,
                    });
                }
                else return res.json({ Status: false });
            });
        }
        else return res.json({
            Status: false,
        });
    });
});

router.route("/s7e/:adminname/:date/:slot4et").get((req, res) => {
    Slots.findOne({
        adminname: req.params.adminname,
        date: req.params.date,
        slot4et: req.params.slot4et
    }, null, (err, result) => {
        if (err) return res.json({ err: err });
        else if (result !== null) {
            return res.json({
                Status: true,
            });
        }
        else if (result == null) {
            AddShedule.findOne({ adminname: req.params.adminname, slot4et: req.params.slot4et }, (err, result) => {
                if (err) return res.json(err);
                else if (result !== null) {
                    return res.json({
                        Status: true,
                    });
                }
                else return res.json({ Status: false });
            });
        }
        else return res.json({
            Status: false,
        });
    });
});

router.route("/s8s/:adminname/:date/:slot5st").get((req, res) => {
    Slots.findOne({
        adminname: req.params.adminname,
        date: req.params.date,
        slot5st: req.params.slot5st
    }, null, (err, result) => {
        if (err) return res.json({ err: err });
        else if (result !== null) {
            return res.json({
                Status: true,
            });
        }
        else if (result == null) {
            AddShedule.findOne({ adminname: req.params.adminname, slot5st: req.params.slot5st }, (err, result) => {
                if (err) return res.json(err);
                else if (result !== null) {
                    return res.json({
                        Status: true,
                    });
                }
                else return res.json({ Status: false });
            });
        }
        else return res.json({
            Status: false,
        });
    });
});

router.route("/s9e/:adminname/:date/:slot5et").get((req, res) => {
    Slots.findOne({
        adminname: req.params.adminname,
        date: req.params.date,
        slot5et: req.params.slot5et
    }, null, (err, result) => {
        if (err) return res.json({ err: err });
        else if (result !== null) {
            return res.json({
                Status: true,
            });
        }
        else if (result == null) {
            AddShedule.findOne({ adminname: req.params.adminname, slot5et: req.params.slot5et }, (err, result) => {
                if (err) return res.json(err);
                else if (result !== null) {
                    return res.json({
                        Status: true,
                    });
                }
                else return res.json({ Status: false });
            });
        }
        else return res.json({
            Status: false,
        });
    });
});

router.route("/s10s/:adminname/:date/:slot6st").get((req, res) => {
    Slots.findOne({
        adminname: req.params.adminname,
        date: req.params.date,
        slot6st: req.params.slot6st
    }, null, (err, result) => {
        if (err) return res.json({ err: err });
        else if (result !== null) {
            return res.json({
                Status: true,
            });
        }
        else if (result == null) {
            AddShedule.findOne({ adminname: req.params.adminname, slot6st: req.params.slot6st }, (err, result) => {
                if (err) return res.json(err);
                else if (result !== null) {
                    return res.json({
                        Status: true,
                    });
                }
                else return res.json({ Status: false });
            });
        }
        else return res.json({
            Status: false,
        });
    });
});

router.route("/s11e/:adminname/:date/:slot6et").get((req, res) => {
    Slots.findOne({
        adminname: req.params.adminname,
        date: req.params.date,
        slot6et: req.params.slot6et
    }, null, (err, result) => {
        if (err) return res.json({ err: err });
        else if (result !== null) {
            return res.json({
                Status: true,
            });
        }
        else if (result == null) {
            AddShedule.findOne({ adminname: req.params.adminname, slot6et: req.params.slot6et }, (err, result) => {
                if (err) return res.json(err);
                else if (result !== null) {
                    return res.json({
                        Status: true,
                    });
                }
                else return res.json({ Status: false });
            });
        }
        else return res.json({
            Status: false,
        });
    });
});

module.exports = router;