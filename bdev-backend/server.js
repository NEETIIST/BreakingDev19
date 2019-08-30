const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

const passport = require("passport");
const users = require("./routes/api/users");
const devs = require("./routes/api/devs");
const admins = require("./routes/api/staffs");
const emails = require("./routes/api/emails");
const ideas = require("./routes/api/ideas");
const teams = require("./routes/api/teams");

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Security Elements
var helmet = require('helmet')
app.use(helmet())

// Brute Force Protections
const slowDown = require("express-slow-down");
//app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 50000000, // allow 50 requests per 15 minutes, then...
    delayMs: 200 // begin adding 200ms of delay per request above 100:
    // request # 101 is delayed by 200ms
    // request # 102 is delayed by 400ms
});
app.use(speedLimiter);

// File Upload
const fileUpload = require('express-fileupload');
app.use(fileUpload());

// Serve Static Files
app.use('/files', express.static('public'))

mongoose.connect('mongodb://127.0.0.1:27017/bdev', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/devs", devs);
app.use("/api/staff", admins);
app.use("/api/ideas", ideas);
app.use("/api/emails", emails);
app.use("/api/teams", teams);



