const mongoose = require("../db");

/**
 * @swagger
 * components:
 *   schemas:
 *     Checkpoint:
 *       type: object
 *       properties:
 *         checkpoint_name:
 *           type: string
 *
 *         direction:
 *           type: string
 *
 *         uuid:
 *           type: string
 *
 *         timestamp:
 *           type: date
 *
 *         checkpoint_type:
 *           type: string
 */

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
