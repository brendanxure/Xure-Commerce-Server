const express = require('express')
const { Register, Login, GetUser, DeleteUser, GetAllUser, UpdateUser, GetAllUserStat } = require('../Controller/UserController')
const { validateTokenForAdmin, validateToken } = require('../Middleware/UserAuth')

const router = express.Router()

router.post(('/register'), Register)
router.post(('/login'), Login)
router.get(('/find/:id'), validateTokenForAdmin, GetUser)
router.put(('/update-user/:id'), validateToken, UpdateUser)
router.delete(('/delete-user/:id'), validateToken, DeleteUser)
router.get('/users', GetAllUser)
router.get('/user-stats', validateTokenForAdmin, GetAllUserStat)

module.exports = router