const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const verifyToken = require('../../auth/tokenVerification');

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateChangePassInput = require("../../validation/changePass");

// Load User model
const User = require("../../models/User");

// Load Email Templates and Function
const emails = require('../../emails');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ username: req.body.username.toLowerCase() }).then(user => {
        if (user) {
            //console.log(user);
            return res.status(403).json({ username_inuse: "Username already in use" });
        }
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                //console.log(user);
                return res.status(403).json({ email_inuse: "Email already in use" });
            }
            if ( req.body.role === "staff" )
                if ( req.body.access_code !== keys.adminPass )
                    return res.status(401).json({ code_wrong: "Wrong Access Code" });
            const newUser = new User({
                username: req.body.username.toLowerCase(),
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(
                            //user => res.json(user)
                            function (user) {
                                // User created
                                // Create JWT Payload
                                const payload = {
                                    id: user.id,
                                    username: user.username,
                                    role: user.role,
                                };
                                // Sign token
                                jwt.sign(
                                    payload,
                                    keys.secretOrKey,
                                    {
                                        expiresIn: 31556926 // 1 year in seconds
                                    },
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            token: "Bearer " + token
                                        });
                                    }
                                );
                                // Send Confirmation Email
                                emails.sendEmail(emails.createdAccount({username:user.username}), req.username);
                            }
                        )
                        .catch(err => console.log(err));
                });
            });
        })
    })

});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const username = req.body.username.toLowerCase();
    const password = req.body.password;
    // Find user by email
    User.findOne({ username }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ usernamenotfound: "User doesn't exist" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

// @route POST api/users/logout
// @desc Delete User Token
// @access Public
// TODO: Review if this is needed or can be done other way
router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

// @route POST api/users/me
// @desc List User Information (test purposes only)
// @access Public
router.get('/me', verifyToken, function(req, res, next) {

    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        // The user is based on the token so it will always match the logged user
        res.status(200).send(user);

    });
});



// @route POST api/users/changepass
// @desc Change User Password, based on previous password
// @access Public
router.post("/changepass", verifyToken, (req, res) => {
    // Form validation
    const { errors, isValid } = validateChangePassInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const old_password = req.body.old_password;
    const new_password = req.body.new_password;
    const new_password_confirmation = req.body.new_password_confirmation;

    User.findOne({ username: req.username }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ usernamenotfound: "There was a problem finding your user" });
        }
        // Check if Passwords match
        bcrypt.compare(old_password, user.password).then(isMatch => {
            if (isMatch) {
                user.password = req.body.new_password;
                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user
                            .save({ _id: user._id })
                            .then(
                                //user => res.json(user)
                                function (user) {
                                    // User created
                                    // Create JWT Payload
                                    const payload = {
                                        id: user.id,
                                        username: user.username,
                                        role: user.role,
                                    };
                                    // Sign token
                                    jwt.sign(
                                        payload,
                                        keys.secretOrKey,
                                        {
                                            expiresIn: 31556926 // 1 year in seconds
                                        },
                                        (err, token) => {
                                            res.json({
                                                success: true,
                                                token: "Bearer " + token
                                            });
                                        }
                                    );
                                }
                            )
                            .catch(err => console.log(err));
                    });
                });
            } else {
                return res
                    .status(400)
                    .json({ oldpasswordincorrect: "Old Password is incorrect" });
            }
        });
    });
});


module.exports = router;
