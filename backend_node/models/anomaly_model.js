const mongoose = require("../db");

const EventSchema = require("./event_model").schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Anomaly:
 *       type: object
 *       properties:
 *         module_version:
 *           type: string
 *
 *         module_id:
 *           type: string
 *
 *         camera_uuid:
 *           type: string
 *
 *         module:
 *           type: string
 *
 *         timestamp:
 *           type: date
 *
 *         json_version:
 *           type: string
 *
 *         events:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Events'
 */

const anomalySchema = new mongoose.Schema(
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

		events: [EventSchema]
	},
	{
		strict: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("Anomaly", anomalySchema);
