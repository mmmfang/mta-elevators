var express 		= require ('express'),
	server			= express(),
	request			= require('request'),
	PORT			= process.env.PORT || 5432,
	MONGOURI 		= process.env.MONGOLAB_URI || 'mongodb://localhost:27017',
	dbname			= 'mta_elevator',
	ejs 			= require('ejs'),
	bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override'),
	expressLayouts 	= require('express-ejs-layouts'),
	session 		= require('express-session'),
	morgan			= require('morgan'),
	mongoose		= require('mongoose'),
	Schema 			= mongoose.Schema;
	bcrypt 			= require('bcryptjs');

function ensureAuthenticated(req,res,next) {
	if (req.session.username) {
		next()
	} else {
		res.redirect('/')
	}
} 

//Middleware
server.use(express.static('./public'));
server.use(expressLayouts);
server.use(morgan('dev'));
server.use(methodOverride('_method'));

server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json()); //i guess this lets me get json

server.use(session({
	secret: "savesessionsaveok",
	resave: true,
	saveUninitialized: false
}));


// Set view engine 
server.set('views', './views');
server.set('view engine', 'ejs');


//Grabbing external MTA XML feed
server.use('/feed', function(req, res) {  
  req.pipe(request('http://web.mta.info/developers/data/nyct/nyct_ene.xml')).pipe(res);
});

//routes to Controllers
var usersController = require('./controllers/users.js');
server.use('/users', usersController);
////anytime i go to anything inside /users, use my user controller


server.get('/test', function(req,res){
	res.write("Welcome to my cooltastic app about outages");
	res.end();
});

server.use(function (req, res, next) {
  res.locals.flash  = req.session.flash || {};
  req.session.flash = {};
  next();
});

//sendfile to render angular

server.get('/',  function (req, res) {
	res.render('main');
})

// server.get('/index', function(req,res){
// 	res.redirect(301, 'angular-templates/angular')
// 	// , {
// 	// 	currentUser:req.session.currentUser
// 	// });
// });

server.get('/index', function(req, res){
    res.sendfile(__dirname + '/public/angular.html');
});

// server.get('/index', function(req, res) {
//     res.sendFile(path.join(__dirname + '/angular.html.ejs'));
// });

// server.get('/about',function(req,res){
//   res.sendFile(path.join(__dirname+'/about.html'));
// });

// server.get('/borough',function(req,res){
//   res.sendFile(path.join(__dirname+'/borough.html'));
// });


// server.get('/trainline',function(req,res){
//   res.sendFile(path.join(__dirname+'/trainline.html'));
// });




//only allow loggedin users to see this page
server.use('/welcome', function(req,res){
	if (req.session.currentUser) {
  		res.render('welcome', {
  			currentUser: req.session.currentUser
  		})
  	} else { 		
   	 res.redirect(301, '/');
  }
});


//utility routes

server.use(function(req,res,next){
	console.log("req dot body", req.body);
	console.log("req dot params", req.params);
	console.log("req dot session", req.session);
	next(); //remember to continue on to the next part of ssesion setting
})
server.use(function(req,res,next){
	req.session.viewCount = req.session.viewCount || 0;
	req.session.viewCount++;
	console.log("Number of views", req.session.viewCount);
	next();
}) 

//catchall routes, as last resort
server.use(function(req,res,next){
	res.send("Sorry, no more pages, continue coding!!");
	res.end();
})



//Mongoose starts, debugger is on
mongoose.set('debug', true);

//Connecting to Mongo database
mongoose.connect(MONGOURI + "/" + dbname);

var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function callback() {
            console.log('db connection open');
        });
        
server.listen(PORT, function() {
	console.log("SERVER IS UP ON PORT", PORT);
});