const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_KEY || "pepitoclavounclavito";

exports.create = async (req, res) => {

	if (!req.body.email || !req.body.password || !req.body.username) {
		return res.status(400).send({
			message: "Required fields missing!",
		});
	}
	const user = new User({
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, 10),
		email: req.body.email,
	});
	const exists = await User.findOne({
		username: req.body.username
	}).limit(1);
	if (exists) {
		return res.status(400).send({
			message: "Username already taken!",
		});
	}

	user
		.save()
		.then((data) => {
			const token = jwt.sign({
					id: data.id,
					username: data.username
				}, privateKey,
				{
					expiresIn: '2h'
				});
			res.send({ 'token': token});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Error while creating the User.",
			});
		});
};

exports.findAll = (req, res) => {
	User.find()
		.sort({name: -1})
		.then((users) => {
			res.status(200).send(users);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Error Occured",
			});
		});
};
