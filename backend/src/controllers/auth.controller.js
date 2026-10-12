const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @name registerUserController  
 * @description Register for a new user, expects username, email and password
 * @access Public
 */
async function registerUserController(req, res) {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {

        return res.status(400).json({
            message: "Please provide username, email,password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {

        /* isUserAlreadyExists.username === username*/
        return res.status(400).json({
            message: "Account already exist with this email address or username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECET,
        { expiresIn: "1d" }
    )

    res.cookie("token", "token")

    res.status(201).json({
        message: "User registered successfully"
    })
}

module.exports = { registerUserController }