const { Op } = require('sequelize')
const {Story, Tag, User, Chapter} = require('../models')

class StoryController {
  static async listAll (req, res, next) {
    try {
      let {tag, search} = req.query
      const page = parseInt(req.query.page) || 1;
      const limit = 5
      const offset = (page - 1) * limit
      let opt = {
        include: [
          User,
          {
            model: Tag,
            attributes: ['id', 'tagName'],
            where: {},
            through: {
              attributes: []
            },
            required: false
          },
          Chapter],
          where: {},
          limit,
          offset,
          distinct: true,
          order: [
            ['votes', 'DESC']
          ]
      }
      
      if (tag) {
        opt.include[1].where = {
          tagName: {
            [Op.iLike]: `%${tag}%`
          }
        }
      }

      if (search) {
        opt.where = {
          title: {
            [Op.iLike]: `%${search}%`
          }
        }
      }

      let {count, rows} = await Story.findAndCountAll(opt)

      if (!rows.length) {
        throw {
          name: 'notFound',
          message: 'Data not found'
        }
      }

      let data = rows.map(e => {
        return {
          id: e.id,
          title: e.title,
          author: e.User.username,
          chapters: e.Chapters.length,
          Tags: e.Tags,
          votes: e.votes,
        }
      })

      res.status(200).json({
        message: 'Successfully fetched Stories',
        count,
        data,
        page
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
        include: [
          {
            model: Tag,
            attributes: ['tagName'],
            through: {
              attributes: []
            },
          },
          User, Chapter]
      })

      if (!data) {
        throw {
          name: 'notFound',
          message: 'Story not found'
        }
      }

      const chapters = data.Chapters.map(e => {
        return {
          id: e.id,
          name: e.name
        }
      })

      data = {
          title: data.title,
          author: data.User.username,
          Tags: data.Tags,
          description: data.description,
          chapters,
          votes: data.votes,
          storyImageUrl: data.storyImageUrl
        }

      res.status(200).json({
        message: 'Successfully fetched Story',
        data
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async vote (req, res, next) {
    try {
      const {storyId} = req.params

      let data = await Story.findByPk(storyId)

      if (!data) {
        throw {
          name: 'notFound',
          message: 'Story not found'
        }
      }

      await data.increment('votes')

      res.status(200).json({
        message: `Vote added`
      })
    }
    catch (error) {
      console.log(error)
      next(error)
    }
  }
}

module.exports = StoryController