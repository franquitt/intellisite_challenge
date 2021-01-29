const mongoose = require('mongoose');

mongoose.connect('mongodb://eladmin:losPollos489@localhost:27017/denunciaapp', {
	useNewUrlParser: true,
	useUnifiedTopology: true
	},
	(err) => {
		if (!err) {
			console.log('Successfully Established Connection with MongoDB')
		}
		else {
			console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
		}
	});
module.exports = mongoose;
