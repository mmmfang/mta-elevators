var mongoose = require('mongoose'),  
	Schema 	 = mongoose.Schema;

var userSchema = new Schema({
		email: {type: String, required: true, unique: true}, 
	 password: {type: String, required: true},
 	notifications: Boolean,
	trainline: String
});


// userSchema.post('save', function(next) {
// if(this.isNew) {
// console.log('A new user was created.');
// } else {
// console.log('A user updated is details.');
// }
// });

var User = mongoose.model('User', userSchema);
//storing user documents in a collection called users
module.exports = User;