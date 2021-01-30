const User = require("../models/user_model");
const sha512 = require("js-sha512").sha512;
const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_KEY || "pepitoclavounclavito";

function generateJwt(user) {
	return jwt.sign({
			id: user.id,
			username: user.username
		}, privateKey,
		{
			expiresIn: '2h'
		});
}

exports.create = async (req, res) => {

	if (!req.body.email || !req.body.password || !req.body.username) {
		return res.status(400).send({
			message: "Required fields missing!",
		});
	}
	const user = new User({
		username: req.body.username,
		password: sha512(req.body.password),
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
			res.send({'token': generateJwt(data)});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Error while creating the User.",
			});
		});
};

exports.login = (req, res) => {
	if (!req.body.password || !req.body.username) {
		return res.status(400).send({
			message: "Required fields missing!",
		});
	}
	User.findOne({
		username: req.body.username,
		password: sha512(req.body.password),
	})
		.then((user) => {
			if (!user)
				return res.status(400).send({
					message: "Username and password didnt match with any user",
				});

			res.status(200).send({'token': generateJwt(user)});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Error Occured",
			});
		});
};
