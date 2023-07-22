const express = require('express')
const { Register, Login, GetUser, DeleteUser } = require('../Controller/UserController')
const { validateTokenForAdmin, validateToken } = require('../Middleware/UserAuth')

const router = express.Router()

router.post(('/register'), Register)
router.post(('/login'), Login)
router.get(('/find/:id'), validateTokenForAdmin, GetUser)
router.delete(('/delete-user/:id'), validateToken, DeleteUser)