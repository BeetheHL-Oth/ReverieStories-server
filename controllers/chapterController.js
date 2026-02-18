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
  static async authorNoteRead (req, res, next) {
    try {
      const {chapterId} = req.params
      
      let data = await AuthorNote.findOne({
        where: {
          ChapterId: chapterId
        }
      })

      if (!data) {
        throw {
          name: 'notFound',
          message: 'Author Note not found'
        }
      }

      res.status(202).json({
        message: 'Successfully fetched Author Note',
        data
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async authorNoteAdd (req, res, next) {
    try {
      const {chapterId} = req.params
      const {note} = req.body

      let data = await AuthorNote.findOne({
        where: {
          ChapterId: chapterId
        }
      })

      if (data) {
        throw {
          name: 'alreadyAdded',
          message: 'There is already an Author Note for this chapter'
        }
      }
      
      await AuthorNote.create({
        note,
        ChapterId: chapterId
      })

      res.status(201).json({
        message: 'Successfully added Author Note for this chapter'
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async authorNoteEdit (req, res, next) {
    try {
      const {chapterId} = req.params
      const {note} = req.body

      let data = await AuthorNote.findOne({
        where: {
          ChapterId: chapterId
        }
      })

      if (!data) {
        throw {
          name: 'notFound',
          message: 'Author Note not found'
        }
      }

      await data.update({
        note
      })

      res.status(200).json({
        message: 'Author Note has been updated'
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async authorNoteDelete (req, res, next) {
    try {
      const {chapterId} = req.params

      let data = await AuthorNote.findOne({
        where: {
          ChapterId: chapterId
        }
      })

      if (!data) {
        throw {
          name: 'notFound',
          message: 'Author Note not found'
        }
      }

      await data.destroy()

      res.status(200).json({
        message: 'Author Note has been deleted'
      })
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = chapterController