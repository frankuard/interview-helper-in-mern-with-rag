const express = require('express')
const { registerUserController, loginUserController, logoutUserController } = require('../controllers/auth.controller')


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

/**
 * @routes GET /api/auth/logout
 * @description Clear token from user cookie and add the token in the blacklist
 * @access Public
 */
authRouter.get("/logout", logoutUserController)

module.exports = authRouter