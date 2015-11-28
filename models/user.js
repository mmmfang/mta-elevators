var mongoose = require('mongoose'),  
	Schema 	 = mongoose.Schema;

var userSchema = Schema({
		email: {type: String, required: true, unique: true}, 
	 password: {type: String, required: true},
 	notifications: Boolean,
	trainline: String
});

var User = mongoose.model('User', userSchema);
//storing user documents in a collection called users
module.exports = User;