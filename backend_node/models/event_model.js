const mongoose = require("../db");

const AlertSchema = require("./alert_model").schema
const TrajectorySchema = require("./trajectory_model").schema

const schema = new mongoose.Schema(
	{
		alerts: [AlertSchema],

		attributes: [],

		id: {
			type: Number,
			required: true,
		},

		instance: {
			type: String,
			required: true,
		},

		images: [],

		trajectory: [TrajectorySchema],

		uuid: {
			type: String,
			required: true,
		},

	},
	{
		strict: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("Event", schema);
