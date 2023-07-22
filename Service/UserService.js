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

const findUsername = async(username)=> {
    try {
        const matchedUsername = await User.findOne({username: username})
        if(!matchedUsername){
            return {code: responsecodes.NOT_FOUND, success: false, data: {errormessage: 'Username not found'}}
        }
        return {code: responsecodes.SUCCESS, success: true, data: matchedUsername}
    } catch (error) {
        return {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, data: error}
    }
}

const createUser = async(email, username, hashedPassword) => {
    try {
        const newUser = await User.create({
            email: email.trim(),
            username: username.trim(),
            password: hashedPassword
        })
        return { code: responsecodes.SUCCESS, success: true, data: newUser}
    } catch (error) {
        return {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, data: error}
    }
}

const findUserById = async(userId)=> {
    try {
        const user = await User.findById(userId)
        if(!user){
            return {code: responsecodes.NOT_FOUND, success: false, data: 'User not found'}
        }
        return {code: responsecodes.SUCCESS, success: true, data: user}
    } catch (error) {
        return {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, data: error}
    }
}

const updateUserById = async(userId, body)=> {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {$set: body}, {new: true})
        if(!updatedUser){
            return {code: responsecodes.NOT_FOUND, success: false, data: 'User not found'}
        }
        return {code: responsecodes.SUCCESS, success: true, data: updatedUser}
    } catch (error) {
        return {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, data: error}
    }
}

const deleteUserById = async(userId)=> {
    try {
        const user = await User.findByIdAndDelete(userId)
        if(!user){
            return {code: responsecodes.NOT_FOUND, success: false, data: 'User not found'}
        }
        return {code: responsecodes.SUCCESS, success: true, data: 'User Deleted'}
    } catch (error) {
        return {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, data: error}
    }
}

const findAllUser = async(query)=> {
    try {
        const users = query ? await User.find().sort({_id: -1}).limit(1) : await User.find()
        if(!users){
            return {code: responsecodes.NOT_FOUND, success: false, data: 'No User'}
        }
        return {code: responsecodes.SUCCESS, success: true, data: users}
    } catch (error) {
        return {code: responsecodes.INTERNAL_SERVER_ERROR, success: false, data: error}
    }
}

module.exports = {
    findEmail,
    findUsername,
    createUser,
    findUserById,
    updateUserById,
    deleteUserById,
    findAllUser
}