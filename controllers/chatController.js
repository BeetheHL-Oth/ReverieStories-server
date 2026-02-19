const {Chat, Message} = require('../models')

class ChatController {
  static async listAll (req, res, next) {
    try {
      let data = await Chat.findAll({
        include: Message,
        where: {
          UserId: req.user.id
        }
      })
      
      res.status(200).json({
        message: 'Successfully fetched all user chats',
        data
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async delete (req, res, next) {
    try {
      const {chatId} = req.params

      let data = await Chat.findByPk(chatId)

      if (!data) {
        throw {
          name: 'notFound',
          message: 'Chat not found'
        }
      }

      await data.destroy()

      res.status(200).json({
        message: 'Chat has been deleted'
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async readOne (req, res, next) {
    try {
      const {chatId} = req.params

      let data = await Chat.findByPk(chatId, {
        include: Message
      })

      if (!data) {
        throw {
          name: 'notFound',
          message: 'Chat not found'
        }
      }

      res.status(200).json({
        message: 'Successfully fetched chat',
        data
      })
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = ChatController