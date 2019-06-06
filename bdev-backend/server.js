const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

const passport = require("passport");
const users = require("./routes/api/users");
const devs = require("./routes/api/devs");
const admins = require("./routes/api/admins");
const emails = require("./routes/api/emails");
const ideas = require("./routes/api/ideas");

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Security Elements
var helmet = require('helmet')
app.use(helmet())

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
app.use("/api/admins", admins);
app.use("/api/emails", emails);
app.use("/api/ideas", ideas);


