const User = require("../models/anomaly_model");
const bcrypt = require("bcryptjs");
/**
 * this method is to create the user
 */
exports.create = (req, res) => {
	/**
	 * validation request
	 */
	if (!req.body.email || !req.body.password || !req.body.name) {
		return res.status(400).send({
			message: "Required field can not be empty",
		});
	}
	/**
	 * Create a user
	 */
	const user = new User({
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10),
		name: req.body.name,
		age: req.body.age,
		gender: req.body.gender,
		isActive: req.body.isActive,
		userType: req.body.userType,
	});
	/**
	 * Save user to database
	 */
	user
		.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the User.",
			});
		});
};

exports.findAll = (req, res) => {
	User.find()
		.sort({ name: -1 })
		.then((users) => {
			res.status(200).send(users);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Error Occured",
			});
		});
};

exports.delete = (req, res) => {
	User.findByIdAndRemove(req.params.id)
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: "User not found ",
				});
			}
			res.send({ message: "User deleted successfully!" });
		})
		.catch((err) => {
			return res.status(500).send({
				message: "Could not delete user ",
			});
		});
};
