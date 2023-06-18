const { responsecodes } = require("../Constant/ResponseCode")
const { findEmail } = require("../Service/UserService")

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
    if(emailExist) {
        res.status(responsecodes.DUPLICATE).json('Email already exist')
    }
}