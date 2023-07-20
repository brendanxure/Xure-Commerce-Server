const { responsecodes } = require("../Constant/ResponseCode")
const { findEmail, findUsername, createUser, findUserById } = require("../Service/UserService")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

const Login = async(req, res) => {
    const {email, password} = req.body

    //no  email 
    if(!email) {
        res.status(responsecodes.BAD_REQUEST).json('Please input email')
    }

    //no password
    if(!password){
        res.status(responsecodes.BAD_REQUEST).json('Please input password')
    }

    //if email exist
    const emailExist = await findEmail(email)
    if(emailExist){
       if(!emailExist.success) {
           res.status(emailExist.code).json(emailExist.data)
       } 
    }
    
    //Confirm Password
    const user = emailExist 
    const checkPassword = await bcrypt.compare(password, user.data.password)

    if(user && checkPassword) {
        const { password, ...others } = user._doc
        res.status(responsecodes.SUCCESS).json({...others, accessToken: generateToken(user._id, user.isAdmin)})
    }
}

const generateToken = (id, isAdmin)=> {
    return jwt.sign({id, isAdmin}, process.env.JWT_SECRET, {expiresIn: '2d'})
}

const GetUser = async (req, res)=> {
    try {
        const user =  await findUserById(req.params.id)
        if(!user.success){
            res.status(user.code).json(user.data)
        }
        const { password, ...others } = user._doc
        res.status(user.code).json(others)
    } catch (error) {
        res.status(error.code).json(error.data)
    }
}

module.exports = {
    Register,
    Login,
    GetUser
}