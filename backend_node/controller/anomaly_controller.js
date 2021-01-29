const Anomaly = require("../models/anomaly_model");

exports.findAll = (req, res) => {
	Anomaly.find()
		.then((anomalies) => {
			res.status(200).send(anomalies);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Error Occured",
			});
		});
};
