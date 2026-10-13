const express = require('express')
const { registerUserController, loginUserController, logoutUserController, getMeController } = require('../controllers/auth.controller')
const { authUser } = require('../middlewares/auth.middleware')


const authRouter = express.Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access public
 */
authRouter.post("/register", registerUserController)

/**
 * @routes POST /api/auth/login
 * @description Login existing user
 * @access public
 */
authRouter.post('/login', loginUserController)

/**
 * @routes GET /api/auth/logout
 * @description Clear token from user cookie and add the token in the blacklist
 * @access public
 */
authRouter.get("/logout", logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get("/get-me", authUser, getMeController)


module.exports = authRouter