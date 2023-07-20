const express = require('express')
const { Register, Login, GetUser } = require('../Controller/UserController')
const { validateTokenForAdmin } = require('../Middleware/UserAuth')

const router = express.Router()

router.post(('/register'), Register)
router.post(('/login'), Login)
router.get(('/find/:id'), validateTokenForAdmin, GetUser)