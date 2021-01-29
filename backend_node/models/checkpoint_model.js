const mongoose = require("../db");

const schema = new mongoose.Schema(
	{
		checkpoint_name: {
			type: String,
			required: false,
		},
		direction: {
			type: String,
			required: false,
		},
		uuid: {
			type: String,
			required: true,
		},
		timestamp: {
			type: Date,
			required: true,
		},
		checkpoint_type: {
			type: String,
			required: true,
		}
	},
	{
		strict: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("Checkpoint", schema);
