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
 *         description: The JWT of the user. Expires in 2 hours
 *         schema:
 *           $ref: '#/components/schemas/User'
 *
 */
router.post("/", userController.create);

/**
 * @swagger
 *
 * /users/login:
 *   post:
 *     tags:
 *       - "users"
 *     summary: Log in.
 *     produces:
 *       - application/json
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  example: "MasterOfPuppets"
 *                password:
 *                  type: string
 *                  example: "NodePackageManager_2020"
 *     responses:
 *       200:
 *         description: The JWT of the user. Expires in 2 hours
 *         schema:
 *           $ref: '#/components/schemas/User'
 *
 */
router.post("/login", userController.login);

module.exports = router;
