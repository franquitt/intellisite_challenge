const mongoose = require("../db");

/**
 * @swagger
 * components:
 *   schemas:
 *     Alert:
 *       type: object
 *       properties:
 *         details:
 *           type: object
 *           properties:
 *             zone_uuid:
 *               type: string
 *             congestion_uuid:
 *               type: string
 *
 *         type:
 *           type: string
 *
 *         name:
 *           type: string
 *
 *         timestamp:
 *           type: date
 */

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
