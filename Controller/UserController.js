const { responsecodes } = require("../Constant/ResponseCode")
const { findEmail, findUsername, createUser, findUserById, updateUserById, deleteUserById, findAllUser, findAllUserStat } = require("../Service/UserService")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Register = async( req, res) => {
    const {email, username, password} = req.body

    console.log(req.body)
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
        return res.status(responsecodes.BAD_REQUEST).json('Please input email')
    }

    //no password
    if(!password){
        return res.status(responsecodes.BAD_REQUEST).json('Please input password')
    }

    try {
        //if email exist
    const emailExist = await findEmail(email)
    if(emailExist){
       if(!emailExist.success) {
           return res.status(emailExist.code).json(emailExist.data)
       } 
    }
   
    //Confirm Password
    const user = emailExist 
    const checkPassword = await bcrypt.compare(password, user.data.password)
    if(!checkPassword){
        return res.status(responsecodes.NOT_FOUND).json("Email and Password not registered")
    }

    if(user && checkPassword) {
        console.log(user)
        const { password, ...others } = user.data._doc
        return res.status(responsecodes.SUCCESS).json({...others, accessToken: generateToken(user._id, user.isAdmin)})
    } else {
        return res.status(responsecodes.NOT_FOUND).json('Incorrect Password')
    }
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json('error occured logging in ' + error)
    }
}

const generateToken = (id, isAdmin)=> {
    return jwt.sign({id, isAdmin}, process.env.JWT_SECRET, {expiresIn: 3600})
}

//get user
const GetUser = async (req, res)=> {
    try {
        const user =  await findUserById(req.params.id)
        if(!user.success){
            res.status(user.code).json(user.data)
        }
        const { password, ...others } = user._doc
        res.status(user.code).json(others)
    } catch (error) {
        if(error.code){
            res.status(error.code).json(error.data)
        }
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

//update user
const UpdateUser = async(req, res)=> {
    try {
       if(req.body.password){
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
       }
       const updatedUser = await updateUserById(req.params.id, req.body)
       if(!updatedUser.success){
        res.status(updatedUser.code).json(updatedUser.data)
    }
    const { password, ...others } = updatedUser._doc
    res.status(updatedUser.code).json(others)
    } catch (error) {
        if(error.code){
            res.status(error.code).json(error.data)
        }
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

const DeleteUser = async(req, res)=> {
    try {
        const user = await deleteUserById(req.params.id)
        if(!user.success){
            res.status(user.code).json(user.data)
        }
        res.status(user.code).json(user.data)
    } catch (error) {
        if(error.code){
            res.status(error.code).json(error.data)
        }
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

const GetAllUser = async(req, res)=> {
    const query = req.query.new
    try {
        const users = query ? await findAllUser(query) : await findAllUser()
        if(!users.success){
            res.status(users.code).json(users.data)
        }
        res.status(users.code).json(users.data)
    } catch (error) {
        if(error.code){
            res.status(error.code).json(error.data)
        }
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

const GetAllUserStat = async(req, res)=> {
    try {
        const allUserStat = await findAllUserStat()
        if(!allUserStat.success){
            res.status(allUserStat.code).json(allUserStat.data)
        }
        res.status(allUserStat.code).json(allUserStat.data)
    } catch (error) {
        res.status(responsecodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

module.exports = {
    Register,
    Login,
    GetUser,
    UpdateUser,
    DeleteUser,
    GetAllUser,
    GetAllUserStat
}