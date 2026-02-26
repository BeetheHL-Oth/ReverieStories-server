const express = require('express')
const AIController = require('../controllers/aiController')
const errorHandler = require('../middleware/errorHandler')
const ChatController = require('../controllers/chatController')
const authentication = require('../middleware/authentication')
const chatOwnerCheck = require('../middleware/chatOwnerCheck')
const router = express.Router()

router.get('/', authentication, ChatController.listAll)
router.post('/chat', authentication, AIController.chatWithCharacter) //input characterDescription, message, chatId
router.post('/tts', authentication, AIController.elevenLabs) //input text
router.post('/chat/:chatId', authentication, chatOwnerCheck, AIController.chatWithCharacter) //input characterDescription, message, chatId
router.get('/:chatId', authentication, chatOwnerCheck, ChatController.readOne)
router.delete('/:chatId', authentication, chatOwnerCheck, ChatController.delete)

router.use(errorHandler)


module.exports = router