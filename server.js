var express 		= require ('express'),
	server			= express(),
	request			= require('request'),
	PORT			= process.env.PORT || 5432,
	MONGOURI 		= process.env.MONGOLAB_URI || 'mongodb://localhost:27017',
	dbname			= 'mta-elevator',
	ejs 			= require('ejs'),
	bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override'),
	expressLayouts 	= require('express-ejs-layouts'),
	session 		= require('express-session'),
	morgan			= require('morgan'),
	mongoose		= require('mongoose'),
	Schema 			= mongoose.Schema;
//I have passport and passport local installed, shall I use them?

function ensureAuthenticated(req,res,next) {
	if (req.session.username) {
		next()
	} else {
		res.redirect('/')
	}
} 

// Set view engine 
server.set('views', './views');
server.set('view engine', 'ejs');

//Middleware
server.use(express.static('./public'));
server.use(expressLayouts);
server.use(morgan('dev'));
server.use(methodOverride('_method'));

server.use(bodyParser.urlencoded({
	extended:true
}));
server.use(bodyParser.json()); //i guess this lets me get json

server.use(session({
	secret: "savesessionsaveok",
	resave: true,
	saveUninitialized: false
}));

//Grabbing external MTA XML feed
server.use('/feed', function(req, res) {  
  req.pipe(request('http://web.mta.info/developers/data/nyct/nyct_ene.xml')).pipe(res);
});


//routes to Controllers
var usersController = require('./controllers/users.js');
server.use('/users', usersController);
////anytime i go to anything inside /users, use my user controller


//Testing Route
server.get('/test', function(req,res){
	res.write("Welcome to my app about outages");
	res.end();
});

server.get('/', function(req,res) {
	res.render('main');
});

//Get Routes Time
// server.get('/', home)
// server.post('/login', home)
// server.all('/', ensureAuthenticated)

//ROUTE TO LOGIN, then directed to a customized page with username. For now I'll use it all in views ejs but in future can then shove those into public/angular-templates


//utility routes

server.use(function(req,res,next){
	console.log("req dot body", req.body);
	console.log("req dot params", req.params);
	console.log("req dot sesion", req.session);
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