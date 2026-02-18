const express = require('express')
const router = express.Router()
const StoryController = require('../controllers/storyController')
const errorHandler = require('../middleware/errorHandler')
const chapterController = require('../controllers/chapterController')
const authentication = require('../middleware/authentication')
const authZ = require('../middleware/authZ')

router.get('/', StoryController.listAll)
router.get('/:storyId', StoryController.storyDetail)
router.patch('/:storyId/vote', authentication, StoryController.vote)
router.get('/:storyId/:chapterId', chapterController.read)
router.get('/:storyId/:chapterId/notes', chapterController.authorNoteRead)
router.post('/:storyId/:chapterId/notes', authentication, authZ, chapterController.authorNoteAdd)
router.put('/:storyId/:chapterId/notes', authentication, authZ, chapterController.authorNoteEdit)
router.delete('/:storyId/:chapterId/notes', authentication, authZ, chapterController.authorNoteDelete)

router.use(errorHandler)

module.exports = router