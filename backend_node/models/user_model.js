const mongoose = require("../db");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *
 *         password:
 *           type: string
 *
 *         email:
 *           type: string
 */

const schema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},

		password: {
			type: String,
			required: true,
		},

		email: {
			type: String,
			required: true,
		},
	},
	{
		strict: true,
		versionKey: false,
		timestamps: true
	}
);

module.exports = mongoose.model("User", schema);
