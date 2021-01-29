const mongoose = require("../db");

const CheckpointSchema = require("./checkpoint_model").schema
const CoordinateSchema = require("./coordinate_model").schema


const schema = new mongoose.Schema(
	{
		checkpoints: [CheckpointSchema],
		coordinates: [CoordinateSchema]

	},
	{
		strict: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("Trajectory", schema);
