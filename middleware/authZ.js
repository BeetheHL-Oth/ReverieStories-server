const {Story} = require("../models")

async function authZ (req, res, next) {
  try {
    const {storyId} = req.params
    
    let data = await Story.findByPk(storyId)

    if (!data) {
      throw {
        name: 'notFound',
        message: 'Story not found'
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

module.exports = authZ