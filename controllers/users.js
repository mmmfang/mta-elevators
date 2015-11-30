var express = require('express'),
	router  = express.Router(),
	User    = require('../models/user.js');


//BCRYPT TIME

//NEW USER TIME
router.post('/new', function (req, res) {

  User.findOne({ email: req.body.user.email }, function (err, user) {
    if (err) {
      console.log(err);
    } else if (user) {
      req.session.flash.emailTaken ='Email in use';
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
              req.session.flash.userNotSaved = 'Unable to save as new user';
            } else {
               req.session.currentUser = savedUser;
               console.log("new current user saved as", req.session.currentUser)
               res.redirect(301, '/welcome');
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
      console.log('hitting first error prob');
      req.session.flash.loginError = 'Error logging in';
    } else if (user) {
      bcrypt.compare(attempt.password, user.passwordDigest, function (compareErr, match) {
        if (match) {
          req.session.currentUser = user;
          console.log('successfully loggedin');
          res.redirect(301, '/welcome');
        } else {
          req.session.flash.emailPasswordMismatch = 'Email and password do not match';
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


//////SHOW  
router.get('/:id/show', function(req, res) {
  User.findById(req.params.id, function(err, specifiedProfile){
    if (err) {
      console.log("error getting id I think??");
    } else {
      console.log('specifiedProfile is', specifiedProfile);
      res.render('users/show', {
        user: specifiedProfile
      });
    }
  }) 
});


//To edit - let's see maybe you will work
router.post('/:_id/', function(req,res){
 User.findOne({_id: req.session.currentUser._id}, function(err,currentUser){
     if (err) { 
         console.log("can't edit user profile");
     } else if (currentUser) {
         if (currentUser._id === req.params.id) {
             res.render('/:_id', {user: currentUser});
         } else {
              console.log('redirecting to users/userIDNUMBER/edit');
             res.redirect(302,'/users/' + currentUser._id + '/edit');    
         }
     } else {
        console.log('redirecting away from editing user profile, not sure why')
         res.redirect(302, '/');
       }
        
 })
});


router.get('/:id/edit', function(req, res) {
  console.log("req params is", req.params);
  console.log("req body is", req.body);

  User.findById(req.params.id, function(err, specifiedProfile){
    if (err) {
      console.log("error editing user");
    } else {
      res.render('users/edit', {
        user: specifiedProfile
      });
    }
  }) 
});


//UPDATE POST (PATCH Part) - at long last, you work. Thank you 30 year old Jesus

router.patch('/:id', function(req, res) {
  var userOptions = req.body.user;
  User.findByIdAndUpdate(req.params.id, userOptions, function(err, specifiedProfile){
    if (err) {
      console.log("error patching user prof");
    } else {
 //     res.redirect(301, '/user/'+req.params.id);
      console.log("updated!!!");
       res.redirect(301, '/'+ specifiedProfile._id)
    }
  })
}); 

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