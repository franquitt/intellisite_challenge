const mongoose = require("../db");

const schema = new mongoose.Schema(
	{
		y: {
			type: Number,
			required: true,
		},
		x: {
			type: Number,
			required: true,
		},
		h: {
			type: Number,
			required: true,
		},
		w: {
			type: Number,
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

module.exports = mongoose.model("Coordinate", schema);
