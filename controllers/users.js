var express = require('express'),
	router  = express.Router(),
	User    = require('../models/user.js');


//Get a users/user:id
//router.get(function(req,res){
//  User.findById(req.session.currentUser.user_id, function (err, user){
//      if (err) 
//          res.send(err);
//       } else {
//      res.redirect('/:userid/preferences';
    //}
//  })
// })

//BCRYPT TIME

//NEW
router.post('/new', function (req, res) {

  User.findOne({ email: req.body.user.email }, function (err, user) {
    if (err) {
      console.log(err);
    } else if (user) {
      req.flash('error', 'email is taken');
      res.redirect(302, '/');
    } else {
      bcrypt.genSalt(10, function (saltErr, salt) {
        bcrypt.hash(req.body.user.password, salt, function (hashErr, hash) {
          var newUser = new User({
            email: req.body.user.email,            
            passwordDigest: hash 
          });

          newUser.save(function (saveErr, savedUser) {
            if (saveErr) {
              req.flash('error', 'unable to save new user')
            } else {
               req.session.currentUser = savedUser;
               res.redirect(302, '/welcome');
            }
          });
        });
      });
    }
  });
});



//////////// AFTER GOING THRU LOGIN PAGE ///////////////////////

//login
router.post('/login', function (req, res) {
    var attempt = req.body.user;
    console.log("attempt is ", attempt);

  User.findOne({ email: attempt.email }, function (err, user) {
    if (err) {
      console.log(err);
    } else if (user) {
      bcrypt.compare(attempt.password, user.passwordDigest, function (compareErr, match) {
        if (match) {
          req.session.currentUser = user;
          res.redirect(302, '/welcome');
        } else {
          req.flash('error', 'email and password do not match')
          res.redirect(302, '/');
        }
      });
    } else {
      console.log('strange error');
      res.redirect(302, '/');
    }
  });
});


////////////TO LOGOUT /////////////////////////////////////////
router.get('/logout', function(req, res) {
    req.session.currentUser = '';
    res.redirect(302,  '/')
})


//To edit - cant use this since you cant edit people at the moment...
// router.get('/:id/edit', function(req,res){
//  User.findOne({_id: req.session.currentUser._id}, function(err,currentUser){
//      if (err) { 
//          console.log("can't edit, u not logged in")
//      } else if (currentUser) {
//          if (currentUser._id === req.params.id) {
//              res.render('/edit', {user:currentUser});
//          } else {
//              res.redirect(302,'/users/' + currentUser._id + '/edit');    
//          }
//      } else {
//          delete res.session.currentUser;
//          res.redirect(302, '/session/new');
//        }
        
//  })
// });

// //SHOW ALL USERS - not applicable

// router.get('/index', function(req, res) {
//  User.find({}, function(err, allUsers){
//      if (err) {
//          console.log("error creating index w all users");
//      } else {
//          res.render('/users/index',{
//              users: allUsers
//          });
//      }
//  })
// });

//export router object
module.exports = router;