const express = require("express");
const router = express.Router();
const anomalyController = require("../controller/anomaly_controller");

/**
 * @swagger
 *
 * /anomalies/:
 *   get:
 *     tags:
 *       - "anomalies"
 *     summary: Returns a list of all the generated anomalies.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             module:
 *               type: string
 *             module_id:
 *               type: string
 *
 */
router.get("/", anomalyController.findAll);

/**
 * @swagger
 *
 * /anomalies/csvfile:
 *   get:
 *     tags:
 *       - "anomalies"
 *     summary: Returns a CSV file with stats, grouped by date and time.
 *     produces:
 *       - text/csv
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: file
 *
 */
router.get("/csvfile", anomalyController.csvfile);

module.exports = router;
