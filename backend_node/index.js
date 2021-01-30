const express = require("express");
const bodyParser = require("body-parser"),
	swaggerJsdoc = require("swagger-jsdoc"),
	swaggerUi = require("swagger-ui-express");
let app = express();

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Intellisite challenge",
			version: "0.1.0",
			description:
				"This is a project that solves the challenge of intellisite for the fullstack position",
			license: {
				name: "MIT",
				url: "https://spdx.org/licenses/MIT.html",
			},
			contact: {
				name: "Franco Agresta González",
				url: "https://github.com/franquitt/intellisite_challenge",
				email: "franquitt@gmail.com",
			},
		},
		servers: [
			{
				url: "http://localhost:8000/api",
			},
		],
		tags: [{
			name: "anomalies",
			description: "Everything about the traffic anomalies"
		}]

	},
	apis: [
		"./models/checkpoint_model.js",
		"./models/coordinate_model.js",
		"./models/trajectory_model.js",
		"./models/alert_model.js",
		"./models/event_model.js",
		"./models/anomaly_model.js",
		"./routes/anomaly_routes.js",
	],
};
const specs = swaggerJsdoc(options);
app.use(
	"/api/docs",
	swaggerUi.serve,
	swaggerUi.setup(specs)
);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

//app.use("/", router);
app.use("/api/anomalies", require("./routes/anomaly_routes"));

app.get('/', (req, res) => {
	res.json({"message": "Congratulations! you are working great!"});
});
app.listen(8000);
console.log("Listening to PORT 8000");
