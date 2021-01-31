const getTimeDiff = (date1, date2) => {
	const diff = date2.getTime() - date1.getTime();
	return new Date(diff).toISOString().slice(11,19);
};

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
	try {
		const file = require(args.file);
		const Anomaly = require("../models/anomaly_model");

		Anomaly.insertMany(file).then(function (result, err) {
			if (err)
				console.log(err);
			else {
				const dateEnd = new Date();
				console.log("Successfully Upload JSON in " + getTimeDiff(dateStart, dateEnd));
			}

			process.exit(1)
		}).catch(error=>{
			//this will rise for example if the json file is not formed as the anomalies schema
			console.log("\n", error.message);
			process.exit(1)
		});
	}catch (error) {
		if (error instanceof SyntaxError) {
			console.log("\nThis is not a valid JSON file...");
		}else{
			console.log("\nAn error ocurred processing file...");
		}
		process.exit(1)
	}
}
