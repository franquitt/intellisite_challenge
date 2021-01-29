const express = require("express");
let app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

//app.use("/", router);
app.use("/users", require("./routes/anomaly_routes"));

app.get('/', (req, res) => {
	res.json({"message": "Congratulations! you are working great!"});
});
app.listen(8000);
console.log("Listening to PORT 8000");
