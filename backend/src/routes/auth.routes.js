const express = require('express')
const { registerUserController, loginUserController } = require('../controllers/auth.controller')


const authRouter = express.Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", registerUserController)

/**
 * @routes POST /api/auth/login
 * @description Login existing user
 * @access Public
 */
authRouter.post('/login', loginUserController)

module.exports = authRouter