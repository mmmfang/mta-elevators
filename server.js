var express 	= require ('express'),
	server		= express(),
	request		= require('request'),
//	PORT		= process.env.PORT || 5432,
	MONGOURI 	= process.env.MONGOLAB_URI || "mongodb://localhost:27017/mta_elevator",
	dbname		= "mta_elevator",
	ejs 		= require('ejs'),
	bodyParser 	= require('body-parser'),
	methodOverride = require('method-override'),
	expressLayouts = require('express-ejs-layouts'),
	session 	= require('express-session'),
	morgan		=require('morgan'),
	mongoose	= require('mongoose'),
	Schema 		= mongoose.Schema;


// Set view engine 
server.set('views', './views');
server.set('view engine', 'ejs');


server.use(express.static('./public'));
server.use(expressLayouts);


//Testing Route
server.get('/test', function(req,res){
	res.write("Welcome to my app about outages");
	res.end();
});

server.get('/', function(req,res) {
	res.render('index');
});


//using request npm 
	// var grabAPI = request('http://web.mta.info/developers/data/nyct/nyct_ene.xml', function (error, response, body) {
	//   if (!error && response.statusCode == 200) {
	//     //console.log(body); // Show the MTA data. 
	//     
	// })


 
server.use('/feed', function(req, res) {  
  req.pipe(request('http://web.mta.info/developers/data/nyct/nyct_ene.xml')).pipe(res);
});


// server.post('/feed', function(response) {

// 	grabAPI(response);

// });


//connecting to Mongo database
mongoose.connect('mongodb://localhost:27017/mta_elevator');
server.listen(3000, function(){
  console.log("Server is up at 3000");
});