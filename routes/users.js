// var express = require('express');
// var router = express.Router();
// var passport = require('passport');
// var jwt = require('jsonwebtoken');
// var User = require('../models/user');
// var database = require('../../database/database');

// var secret = '7x0jhxt"9(thpX6';

// router.post('/login', function (req, res, next) {
//   passport.authenticate('local', function (err, user, info) {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials.' });
//     }
//     if (user) {
//       var token = jwt.sign({ id: user._id, email: user.email }, secret);
//       return res
//         .status(200)
//         .json({ token });
//     }
//   })(req, res, next);
// });

// router.post('/register', function (req, res) {
//   // User.register(new User({ email: req.body.email }), req.body.password, function (err, user) {
//     User.register(new User({currentnumber: req.body.currentnumber}), req.body.firstname, function (err, user) {
//     if (err) {
//       return res.status(400).send({ error: 'Number have already existed.' })
//     }
//     res.status(200).send(user);
//   });
// });

// router.post('/register', function (req, res) {
//   var today = new Date();
//     var appData = {
//         "error": 1,
//         "data": ""
//     };
//     var userData = {
//         "firstname": req.body.firstname,
//         "surname": req.body.surname,
//         "last6nin": req.body.last6nin,
//         "oldnumber": req.body.oldnumber,
//         "currentnumber": req.body.currentnumber,
//         "created": today
//     }

//     database.connection.getConnection(function(err, connection) {
//       if (err) {
//           appData["error"] = 1;
//           appData["data"] = "Internal Server Error";
//           res.status(500).json(appData);
//       } else {
//           connection.query('INSERT INTO users SET ?', userData, function(err, rows, fields) {
//               if (!err) {
//                   appData.error = 0;
//                   appData["data"] = "User registered successfully!";
//                   res.status(201).json(appData);
//               } else {
//                   appData["data"] = "Error Occured!";
//                   res.status(400).json(appData);
//               }
//           });
//           connection.release();
//       }
//   });
// });

// router.get('/getUsers', function(req, res) {

//   var appData = {};

//   database.connection.getConnection(function(err, connection) {
//       if (err) {
//           appData["error"] = 1;
//           appData["data"] = "Internal Server Error";
//           res.status(500).json(appData);
//       } else {
//           connection.query('SELECT *FROM users', function(err, rows, fields) {
//               if (!err) {
//                   appData["error"] = 0;
//                   appData["data"] = rows;
//                   res.status(200).json(appData);
//               } else {
//                   appData["data"] = "No data found";
//                   res.status(204).json(appData);
//               }
//           });
//           connection.release();
//       }
//   });
// });

// module.exports = router;
var express = require('express');
var users = express.Router();
var database = require('../database/database');
var cors = require('cors')
var jwt = require('jsonwebtoken');
var token;

users.use(cors());

process.env.SECRET_KEY = "devesh";

users.post('/register', function(req, res) {

    var today = new Date();
    var appData = {
        "error": 1,
        "data": ""
    };
    var userData = {
      "firstname": req.body.firstname,
      "surname": req.body.surname,
      "last6nin": req.body.last6nin,
      "oldnumber": req.body.oldnumber,
      "currentnumber": req.body.currentnumber,
       "created": today
    }
      
    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query('INSERT INTO user SET ?', userData, function(err, rows, fields) {
                if (!err) {
                    appData.error = 0;
                    appData["data"] = "User registered successfully!";
                    res.status(200).send(users);
                    res.status(201).json(appData);
                } else {
                    appData["data"] = "Error Occured!";
                    res.status(400).json(appData);
                }
            });
            connection.release();
        }
    });
});

users.post('/login', function(req, res) {

    var appData = {};
    var email = req.body.email;
    var password = req.body.password;

    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query('SELECT * FROM users WHERE email = ?', [email], function(err, rows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = "Error Occured!";
                    res.status(400).json(appData);
                } else {
                    if (rows.length > 0) {
                        if (rows[0].password == password) {
                            let token = jwt.sign(rows[0], process.env.SECRET_KEY, {
                                expiresIn: 1440
                            });
                            appData.error = 0;
                            appData["token"] = token;
                            res.status(200).json(appData);
                        } else {
                            appData.error = 1;
                            appData["data"] = "Email and Password does not match";
                            res.status(204).json(appData);
                        }
                    } else {
                        appData.error = 1;
                        appData["data"] = "Email does not exists!";
                        res.status(204).json(appData);
                    }
                }
            });
            connection.release();
        }
    });
});

users.post('/login', function(req, res) {

    var appData = {};
    var email = req.body.email;
    var password = req.body.password;

    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query('SELECT * FROM users WHERE email = ?', [email], function(err, rows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = "Error Occured!";
                    res.status(400).json(appData);
                } else {
                    if (rows.length > 0) {
                        if (rows[0].password == password) {
                            token = jwt.sign(rows[0], process.env.SECRET_KEY, {
                                expiresIn: 5000
                            });
                            appData.error = 0;
                            appData["token"] = token;
                            res.status(200).json(appData);
                        } else {
                            appData.error = 1;
                            appData["data"] = "Email and Password does not match";
                            res.status(204).json(appData);
                        }
                    } else {
                        appData.error = 1;
                        appData["data"] = "Email does not exists!";
                        res.status(204).json(appData);
                    }
                }
            });
            connection.release();
        }
    });
});

users.use(function(req, res, next) {
    var token = req.body.token || req.headers['token'];
    var appData = {};
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function(err) {
            if (err) {
                appData["error"] = 1;
                appData["data"] = "Token is invalid";
                res.status(500).json(appData);
            } else {
                next();
            }
        });
    } else {
        appData["error"] = 1;
        appData["data"] = "Please send a token";
        res.status(403).json(appData);
    }
});

users.get('/getUsers', function(req, res) {

    var appData = {};

    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query('SELECT *FROM users', function(err, rows, fields) {
                if (!err) {
                    appData["error"] = 0;
                    appData["data"] = rows;
                    res.status(200).json(appData);
                } else {
                    appData["data"] = "No data found";
                    res.status(204).json(appData);
                }
            });
            connection.release();
        }
    });
});

module.exports = users;