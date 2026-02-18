const generateChatResponse = require("../utility/groq")

class AIController {
  static async chatWithCharacter(req, res, next) {
    try {
      const {characterDescription, message} = req.body

      if (!characterDescription || !message) {
        throw {
          name: 'InvalidPrompt',
          message: 'Character description or message required.'
        }
      }

      // const characterPrompt = `You are ${characterDescription}. stay in character at all times. Speak naturally and creatively.`

      const reply = await generateChatResponse({
        characterDescription,
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })

      res.status(200).json({
        message: 'successfully generated message',
        reply
      })
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = AIController