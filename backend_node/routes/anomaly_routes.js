const express = require("express");
const router = express.Router();
const anomalyController = require("../controller/anomaly_controller");

router.get("/", anomalyController.findAll);

module.exports = router;
