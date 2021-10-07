const express = require("express");
const mongoose = require("mongoose")
const Port = process.env.PORT || 5000;
var cors = require('cors')
const app = express(); 
/*
mongoose.connect('mongodb+srv://xyz:xyz@sandbox.tkj4l.mongodb.net/myapp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false,
});
*/

mongoose.connect('mongodb://localhost:27017/database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false,
});

const connection = mongoose.connection;
connection.once("open", () => {console.log("MongoDb connected");});

app.use("/images", cors(), express.static("images"));
app.use(express.json());

const adminRoute = require("./routes/admin");
app.use("/admin", adminRoute);

const profileRoute = require("./routes/profile");
app.use("/profile", profileRoute);

const productRoute = require("./routes/add_product");
app.use("/add_product", productRoute);

const customerRoute = require("./routes/customer");
app.use("/customer", customerRoute);

const sheduleRoute = require("./routes/add_shedule");
app.use("/add_shedule", sheduleRoute);

const appointmentRoute = require("./routes/Customerappointment");
app.use("/add_appointment", appointmentRoute); 

//trying
const tryappointmentRoute = require("./routes/appointment");
app.use("/appointment", tryappointmentRoute);

const slotcheck = require("./routes/slot_check");
app.use("/slot_check", slotcheck);

const serviceRoute = require("./routes/add_service");
app.use("/add_service", serviceRoute);

app.route("/").get((req, res) => res.json("Hello world...!!!"));

app.listen(Port, "0.0.0.0", () => console.log(`your server is running on port ${Port}`));