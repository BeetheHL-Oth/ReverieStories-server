const express = require('express')
const AIController = require('../controllers/aiController')
const errorHandler = require('../middleware/errorHandler')
const router = express.Router()

router.post('/chat', AIController.chatWithCharacter) //input characterDescription, message

router.use(errorHandler)


module.exports = router