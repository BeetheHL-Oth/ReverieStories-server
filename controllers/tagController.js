const {Tag} = require('../models')

class TagController {
  static async listAll(req, res, next) {
    try {
      let data = await Tag.findAll()

      data = data.map(e => {
        return {
          id: e.id,
          tagName: e.tagName
        }
      })

      res.status(200).json({
        message: 'Successfully fetched all tags',
        data
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async add(req, res, next) {
    try {
      let {tagName} = req.body

      let data = await Tag.create({
        tagName
      })

      res.status(201).json({
        message: `${data.tagName} tag has been added`
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async delete(req, res, next) {
    try {
      const {tagId} = req.params

      let data = await Tag.findByPk(tagId)

      if (!data) {
        throw {
          name: 'notFound',
          message: 'Tag not found'
        }
      }

      await data.destroy()

      res.status(200).json({
        message: `${data.tagName} tag has been deleted`
      })
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = TagController