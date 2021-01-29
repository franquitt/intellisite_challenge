const mongoose = require("../db");
const schema = new mongoose.Schema(
	{
		module_version: {
			type: String,
			required: true,
		},
		module_id: {
			type: String,
			required: true,
		},
		camera_uuid: {
			type: String,
			required: true,
		},
		module: {
			type: String,
			required: true,
		},
		timestamp: {
			type: Date,
			required: true,
		},
		json_version: {
			type: String,
			required: true,
		},
	},
	{
		strict: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("Anomaly", schema);
