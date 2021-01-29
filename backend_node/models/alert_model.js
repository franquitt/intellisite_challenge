const mongoose = require("../db");

const schema = new mongoose.Schema(
	{
		details: {
			zone_uuid: {
				type: String,
				required: false,
			},
			congestion_uuid: {
				type: String,
				required: false,
			}
		},
		type: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		timestamp: {
			type: Date,
			required: true,
		}
	},
	{
		strict: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("Alert", schema);
