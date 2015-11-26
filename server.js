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


function ensureAuthenticated(req,res,next) {
	if (req.session.username) {
		next()
	} else {
		res.redirect('/')
	}
} 

// Set view engine 
// server.set('views', './views');
// server.set('view engine', 'ejs');

server.use(express.static('./public'));
server.use(expressLayouts);
server.use(morgan('dev'));
server.use(methodOverride('_method'));

server.use(bodyParser.urlencoded({
	extended:true
}));
server.use(bodyParser.json()); //i guess this lets me get json

//Testing Route
server.get('/test', function(req,res){
	res.write("Welcome to my app about outages");
	res.end();
});

server.get('/', function(req,res) {
	res.render('main');
});

//Grabbing external MTA XML feed
server.use('/feed', function(req, res) {  
  req.pipe(request('http://web.mta.info/developers/data/nyct/nyct_ene.xml')).pipe(res);
});

//let's say i saved things like data in the db. id get it by in my controllers/users.js, after ive required router, router.post(function(req,res)) --to create a new user  / router.get(function(req,res{User.find(function(err, users){ if (err)res.send(err); res.json(users);});});  to get all the Users

//Get a users/user:id
//router.get(function(req,res){
// 	User.findById(req.params.user_id, function (err, user){
// 		if (err) 
// 			res.send(err);
// 		res.json(bear);
// 	})
// })

//Get Routes Time
// server.get('/', home)
// server.post('/login', home)
// server.all('/', ensureAuthenticated)

//ROUTE TO LOGIN, then directed to a customized page with username. For now I'll use it all in views ejs but in future can then shove those into public/angular-templates

//routes to Controllers
var usersController = require('./controllers/users.js');
server.use('/users', usersController);

// var postsController = require('./controllers/posts.js');
// server.use('/posts', postsController);

//anytime i go to anything inside posts, use my post controller


//=======Model - store in models/post.js
// var mongoose = require('mongoose'),
// 	Schema = mongoose.Schema;

// var preferenceSchema = Schema({
// 	station: {type: String},
// 	trainline: {type: String},
//	alert: {type: boolean},
// 	body: {type: String, required: true},

// }, {collection: 'preferences', strict:false});

///HOW do i do the belongs to association for the user in mongo or node 

// var Post = mongoose.model("Post", postSchema);

// module.exports = Post;
/////=====END OF MONGOOSE SCHEMAS TO PASTE IN LATER


//Mongoose starts
mongoose.set('debug', true);

//connecting to Mongo database
mongoose.connect(MONGOURI + "/" + dbname);

var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function callback() {
            console.log('db connection open');
        });
        
server.listen(PORT, function() {
	console.log("SERVER IS UP ON PORT", PORT);
});