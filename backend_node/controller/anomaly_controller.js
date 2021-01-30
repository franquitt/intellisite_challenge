const Parser = require('json2csv').Parser;

const Anomaly = require("../models/anomaly_model");

exports.findAll = (req, res) => {
	let {page = 1, limit = 10} = req.query;
	page = parseInt(page);
	limit = parseInt(limit);
	Anomaly.find().limit(limit)
		.skip((page - 1) * limit)
		.then((anomalies) => {
			res.status(200).send(anomalies);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Error Occured",
			});
		});
};

const csvHeaders = [
	{label: "Date", value: "date"},
	{label: "Day of Week", value: "day_week"},
	{label: "Hour", value: "hour"},
	{label: "Camera", value: "camera"},
	{label: "Car Count", value: "car"},
	{label: "Bus Count", value: "bus"},
	{label: "Motorbike Count", value: "botorbike"},
	{label: "Truck Count", value: "truck"},
	{label: "Bicycle Count", value: "bicycle"},
	{label: "Person Count", value: "person"},
	{label: "Traffic Congestion", value: "trafficCongestion"},
	{label: "Queue Clearing", value: "queueClearing"},
	{label: "Wrong Way", value: "wrongWay"},
	{label: "Unsafe Lane Entry", value: "unsafeLaneEntry"},
	{label: "Stalled Car", value: "stalledCar"},
	{label: "Illegal Turn", value: "illegalTurn"},
	{label: "Jay Walking", value: "jaywalking"},
];

const alert_names = [
	"trafficCongestion",
	"queueClearing",
	"wrongWay",
	"unsafeLaneEntry",
	"stalledCar",
	"illegalTurn",
	"jaywalking"
];

const instance_names = [
	'car',
	'bus',
	'motorbike',
	'truck',
	'bicycle',
	'person'
];

const base_entry = {
	camera: [],
	car: 0,
	bus: 0,
	motorbike: 0,
	truck: 0,
	bicycle: 0,
	person: 0,
	trafficCongestion: 0,
	queueClearing: 0,
	wrongWay: 0,
	unsafeLaneEntry: 0,
	stalledCar: 0,
	illegalTurn: 0,
	jaywalking: 0
};

exports.csvfile = async (req, res) => {
	Anomaly.find({
		"events.trajectory.checkpoints.checkpoint_name": 'countingLine'
	}).sort({timestamp: 'asc'})
		.then((anomalies) => {
			//all data will be in gmt -0
			let data_by_time = {};
			anomalies.forEach(anomaly => {
				//this will be our key
				let date_time = new Date(anomaly.timestamp).toISOString().substr(0, 16);
				if (!data_by_time[date_time])
					data_by_time[date_time] = {...base_entry};

				// registry of involved cameras
				data_by_time[date_time].camera.push(anomaly.camera_uuid);

				anomaly.events.forEach(event => {
					// counting of trafficCongestion queueClearing etc
					event.alerts.forEach(alert => {
						if (alert_names.includes(alert.name))
							data_by_time[date_time][alert.name] += 1;
					})

					// counting of person car bike etc
					if (instance_names.includes(event.instance))
						data_by_time[date_time][event.instance] += 1;
				});

			});

			let csv_rows = [csvHeaders];

			Object.keys(data_by_time).forEach(date_time => {
				data_by_time[date_time].camera = [...new Set(data_by_time[date_time].camera)];
				data_by_time[date_time].camera = data_by_time[date_time].camera.join(", ")
				const date = new Date(date_time + ":00.000Z");

				// convert all to arg time and add date time and day of the week
				data_by_time[date_time].date = date.toLocaleDateString("es-AR", {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit'
				});
				data_by_time[date_time].hour = date.toLocaleDateString("es-AR", {
					hour: '2-digit',
					minute: '2-digit'
				}).split(" ")[1];
				data_by_time[date_time].day_week = date.getDay();

				csv_rows.push(data_by_time[date_time]);
				delete data_by_time[date_time];
			});

			const json2csv = new Parser({fields: csvHeaders});
			const csv = json2csv.parse(csv_rows);
			res.header('Content-Type', 'text/csv');
			res.attachment('anomalies.csv');
			return res.send(csv);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Error Occured",
			});
		});
}

exports.removeAll = async (req, res) => {
	Anomaly.deleteMany().then(result => {
		res.status(200).send({
			message: "OK"
		});
	}).catch((err) => {
		res.status(500).send({
			message: err.message || "Error Occured",
		});
	});
}
