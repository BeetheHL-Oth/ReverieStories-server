const {Story, Tag, User, Chapter} = require('../models')

class StoryController {
  static async listAll (req, res, next) {
    try {
      let data = await Story.findAll({
        include: [User, Tag, Chapter]
      })

      if (!data) {
        throw {
          name: 'notFound',
          message: 'Data not found'
        }
      }

      data = data.map(e => {
        return {
          title: e.title,
          author: e.User.username,
          chapters: e.Chapters.length,
          Tags: e.Tags,
          votes: e.votes,
        }
      })

      res.status(200).json({
        message: 'Success read data',
        data
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async storyDetail (req, res, next) {
    try {
      const {storyId} = req.params
      let data = await Story.findByPk(storyId, {
        include: [Tag, User, Chapter]
      })

      if (!data) {
        throw {
          name: 'notFound',
          message: 'Story not found'
        }
      }

      const chapters = data.Chapters.map(e => {
        return {
          name: e.name
        }
      })

      data = {
          title: data.title,
          author: data.User.username,
          Tags: data.Tags,
          description: data.description,
          chapters,
          votes: data.votes
        }

      res.status(200).json({
        message: 'Success get story',
        data
      })
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = StoryController