const { responsecodes } = require("../Constant/ResponseCode")
const { findEmail, findUsername, createUser } = require("../Service/UserService")
const bcrypt = require('bcryptjs')

const Register = async( req, res) => {
    const {email, username, password} = req.body

    //no email
    if(!email) {
        res.status(responsecodes.BAD_REQUEST).json('Email is required')
    }

    //no username
    if(!username) {
        res.status(responsecodes.BAD_REQUEST).json('Username is required')
    }

    //no password
    if(!password) {
        res.status(responsecodes.BAD_REQUEST).json('Password is required')
    } 

    //if Email Exist
    const emailExist = await findEmail(email)
    if(emailExist.success) {
        res.status(responsecodes.DUPLICATE).json('Email already exist')
    }

    //if Username Exist 
    const usernameExist = await findUsername(username)
    if(usernameExist.success) {
        res.status(responsecodes.DUPLICATE).json('Username already exist')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const newUser = await createUser(email, username, hashedPassword)
    if (newUser){
        if(newUser.success) {
            res.status(newUser.code).json(newUser.data)
        } else {
            res.status(newUser.code).json(newUser.data)
        }
    } else {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(`Error: User couldn't be created`)
    }
}

module.exports = {
    Register
}