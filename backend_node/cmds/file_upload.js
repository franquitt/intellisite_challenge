const getTimeDiff = (date1, date2) => {
	const diff = date2.getTime() - date1.getTime();

	let msec = diff;
	var hh = Math.floor(msec / 1000 / 60 / 60);
	msec -= hh * 1000 * 60 * 60;
	const mm = Math.floor(msec / 1000 / 60);
	msec -= mm * 1000 * 60;
	const ss = Math.floor(msec / 1000);
	msec -= ss * 1000;
	return hh + " hs - " + mm + " min - " + ss + " seg";
}

module.exports = (args) => {
	if (!args.file) {
		console.log("\nAdd the location of the file with --file uploadFile.json\n");
		return;
	}
	const fs = require("fs");
	if (!fs.existsSync(args.file)) {
		console.log("\nFile "+args.file+" not found\n");
		return;
	}
	console.log("\nProcessing file...");
	const dateStart = new Date();
	const file = require(args.file);
	const Anomaly = require("../models/anomaly_model");

	Anomaly.insertMany(file).then(function(result, err) {
		if(err)
			console.log(err)
		else{
			const dateEnd = new Date();
			console.log("Successfully Upload JSON in "+getTimeDiff(dateStart, dateEnd));
		}
		process.exit(1)
	})
}
