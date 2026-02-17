const {Story, Chapter, AuthorNote} = require('../models')

class chapterController {
  static async read(req, res, next) {
    try {
      const {chapterId} = req.params

      let data = await Chapter.findByPk(chapterId, {
        include: AuthorNote
      })

      if (!data) {
        throw {
          name: 'notFound',
          message: 'Chapter not found'
        }
      }

      res.status(200).json({
        message: 'Successfully fetched chapter',
        data
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async add(req, res, next) {
    try {
      const {storyId} = req.params
      const {name, body, chapterImageUrl} = req.body

      let data = await Chapter.create({
        name,
        body,
        chapterImageUrl,
        StoryId: storyId
      })

      res.status(201).json({
        message: 'Successfully added chapter',
        data
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async edit(req, res, next) {
    try {
      const {chapterId} = req.params
      const {name, body, chapterImageUrl} = req.body

      let data = await Chapter.findByPk(chapterId)

      if (!data) {
        throw {
          name: 'notFound',
          message: 'Chapter not found'
        }
      }

      await data.update({
        name,
        body,
        chapterImageUrl
      })

      res.status(200).json({
        message: 'Successfully updated chapter'
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async delete(req, res, next) {
    try {
      const {chapterId} = req.params

      let data = await Chapter.findByPk(chapterId)

      if (!data) {
        throw {
          name: 'notFound',
          message: 'Chapter not found'
        }
      }

      await data.destroy({});

      res.status(200).json({
        message: `Chapter titled ${data.name} has been deleted`
      })
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = chapterController