const generateChatResponse = require("../utility/groq")
const { Chat, Message } = require('../models')

class AIController {
  static async chatWithCharacter(req, res, next) {
    try {
      const {characterDescription, message} = req.body
      const {chatId} = req.params

      if (!message) {
        throw {
          name: 'invalidPrompt',
          message: 'Message required.'
        }
      }

      let chat

      if (chatId) {
        chat = await Chat.findByPk(chatId)

        if (!chat) {
          throw {
            name: 'notFound',
            message: 'Chat not found'
          }
        }

        if (chat.UserId !== req.user.id) {
          throw {
            name: 'forbidden',
            message: 'You do not have access to this chat'
          }
        }
      }
      else {
        if (!characterDescription) {
          throw {
            name: 'invalidPrompt',
            message: 'Character Description required for new chat'
          }
        }

        chat = await Chat.create({
          characterDescription,
          UserId: req.user.id
        })
      }

      await Message.create({
        ChatId: chat.id,
        role: 'user',
        content: message
      })

      let memoryMessages = await Message.findAll({
        where: {
          ChatId: chat.id
        },
        attributes: ['role', 'content'],
        order: [['createdAt', 'DESC']],
        limit: 8
      })

      memoryMessages.reverse()

      memoryMessages = memoryMessages.map(e => ({
        role: e.role,
        content: e.content
      }))

      const reply = await generateChatResponse({
        characterDescription: chat.characterDescription,
        messages: memoryMessages
      })

      await Message.create({
        ChatId: chat.id,
        role: 'assistant',
        content: reply
      })

      res.status(200).json({
        message: 'successfully generated message',
        chatId: chat.id,
        reply
      })
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = AIController