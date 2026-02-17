const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController')
const errorHandler = require('../middleware/errorHandler')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.use(errorHandler)


module.exports = router