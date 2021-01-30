const mongoose = require("../db");

const CheckpointSchema = require("./checkpoint_model").schema
const CoordinateSchema = require("./coordinate_model").schema

/**
 * @swagger
 * components:
 *   schemas:
 *     Trajectory:
 *       type: object
 *       properties:
 *         checkpoints:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Checkpoint'
 *
 *         coordinates:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Coordinate'
 */

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
