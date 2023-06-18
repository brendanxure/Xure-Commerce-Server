const { responsecodes } = require("../Constant/ResponseCode")
const User = require("../Model/User")

const findEmail = async(email) => {
    try {
        const matchedEmail = await User.findOne({email: email})
        if(!matchedEmail){
            return {code: responsecodes.NOT_FOUND, success: false, data: {errormessage: 'Email not found'}}
        }
        return {code: responsecodes.SUCCESS, success: true, data: matchedEmail}
    } catch (error) {
        return {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, data: error}
    }
}

module.exports = {
    findEmail
}