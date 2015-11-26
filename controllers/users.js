var express = require('express'),
	router = express.Router();
	User = require('../models/user.js');

//var User = require('mongoose').model('User');

router.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.save(function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(user);
        }
    });
};

//let's say i saved things like data in the db. id get it by in my controllers/users.js, after ive required router, router.post(function(req,res)) --to create a new user  / router.get(function(req,res{User.find(function(err, users){ if (err)res.send(err); res.json(users);});});  to get all the Users