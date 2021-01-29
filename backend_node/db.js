const mongoose = require('mongoose');
const default_url = 'mongodb://eladmin:losPollos489@localhost:27017/denunciaapp';
mongoose.connect(process.env.MONGO_URL ? process.env.MONGO_URL : default_url, {
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
