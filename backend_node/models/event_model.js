const mongoose = require("../db");

const AlertSchema = require("./alert_model").schema
const TrajectorySchema = require("./trajectory_model").schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Events:
 *       type: object
 *       properties:
 *
 *         alerts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Alert'
 *
 *         attributes:
 *           type: array
 *           items:
 *             type: string
 *
 *         id:
 *           type: number
 *
 *         instance:
 *           type: string
 *
 *         images:
 *           type: array
 *           items:
 *             type: string
 *
 *         trajectory:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Trajectory'
 *
 *         uuid:
 *           type: string
 */

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
