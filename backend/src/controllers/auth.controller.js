const userModel = require("../models/user.model");


/**
 * @name registerUserController  
 * @description Register for a new user, expects username, email and password
 * @access Public
 */
export async function registerUserController(req, res) {

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
}
