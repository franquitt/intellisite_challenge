const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_KEY || "sbVeTJRBjEvpHd8QXHDWzhGYauSq5C2g";

module.exports = function (req, res, next) {
	const token = req.header("token");
	if (!token) return res.status(401).json({message: "Auth Error"});
	try {
		const decoded = jwt.verify(token, privateKey);
		req.user = decoded.user;
		next();
	} catch (e) {
		res.status(500).send({message: "Invalid Token"});
	}
};
