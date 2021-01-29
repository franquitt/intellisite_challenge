/*const file = require('../requirements/resources/events.json');
const User = require("./models/anomaly_model");

User.insertMany(file, function(err,result) {
	console.log(err)
	console.log(result)
})
*/

module.exports = (args) => {
	console.log(args)
	if(!args.file){
		console.log("Adjunte un archivo con -- file archivo.ext");
		return;
	}
}
