const {Story, Tag, Chapter, StoryTag} = require('../models')

class MyStoryController {
  static async listAll (req, res, next) {
    try {
      const UserId = req.user.id

      const data = await Story.findAll({
        include: [
          {
            model: Tag,
            attributes: ['tagName'],
            through: {
              attributes: []
            },
          },
          Chapter],
        where: {
          UserId
        }
      })

      if (!data) {
        throw {
          name: 'notFound',
          message: 'Data not found'
        }
      }

      res.status(200).json({
        message: 'Successfully fetched myStories',
        data
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async add (req, res, next) {
    try {
      let {title, description, storyImageUrl} = req.body

      let data = await Story.create({
        title,
        description,
        storyImageUrl,
        UserId: req.user.id
      });

      res.status(201).json({
        message: 'Story details updated',
        data
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async edit (req, res, next) {
    try {
      const {storyId} = req.params
      const {title, description, storyImageUrl} = req.body

      const data = await Story.findByPk(storyId)

      if (!data) {
        throw {
          name: 'notFound',
          message: 'Story not found'
        }
      }
      
      await data.update({
        title,
        description,
        storyImageUrl
      })

      res.status(200).json({
        message: 'Story details updated',
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async delete (req, res, next) {
    try {
      const {storyId} = req.params

      const data = await Story.findByPk(storyId)

      if (!data) {
        throw {
          name: 'notFound',
          message: 'Story not found'
        }
      }

      await data.destroy()

      res.status(200).json({
        message: `${data.title} has been deleted`,
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async addTag (req, res, next) {
    try {
      const {storyId, tagId} = req.params

      let data = await StoryTag.create({
        StoryId: storyId,
        TagId: tagId
      })

      res.status(201).json({
        message: 'Tag added',
        data
      })
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = MyStoryController