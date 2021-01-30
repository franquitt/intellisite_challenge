const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller");

/**
 * @swagger
 *
 * /users/:
 *   post:
 *     tags:
 *       - "users"
 *     summary: registry an user.
 *     produces:
 *       - application/json
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: '#/components/schemas/User'
 *
 */
router.post("/", userController.create);

module.exports = router;
