const express = require("express");
const router = express.Router();
const anomalyController = require("../controller/anomaly_controller");
const auth = require("../middleware/auth");
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
 *     parameters:
 *       - name: "page"
 *         in: "query"
 *         description: "Actual page of pagination(default=1)"
 *         required: false
 *         type: number
 *       - name: "limit"
 *         in: "query"
 *         description: "Results by pagination(default=10)"
 *         required: false
 *         type: number
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Anomaly'
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


/**
 * @swagger
 *
 * /anomalies/removeAll:
 *   delete:
 *     tags:
 *       - "anomalies"
 *     summary: Removes all anomalies in the database. You must be logged in.
 *     produces:
 *       - application/json
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: file
 *
 */
router.delete("/removeAll", auth, anomalyController.removeAll);

module.exports = router;
