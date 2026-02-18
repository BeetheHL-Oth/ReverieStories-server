const {Chat} = require("../models")

async function chatOwnerCheck (req, res, next) {
  try {
    const {chatId} = req.params
    
    let data = await Chat.findByPk(chatId)

    if (!data) {
      throw {
        name: 'notFound',
        message: 'Chat not found'
      }
    }

    if(data.UserId !== req.user.id) {
      throw {
        name: 'forbidden',
        message: 'You are not authorized'
      }
    }

    next()
  }
  catch (error) {
    next(error)
  }
}

module.exports = chatOwnerCheck