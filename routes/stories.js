const express = require('express')
const router = express.Router()
const StoryController = require('../controllers/storyController')
const errorHandler = require('../middleware/errorHandler')
const chapterController = require('../controllers/chapterController')
const authentication = require('../middleware/authentication')

router.get('/', StoryController.listAll)
router.get('/:storyId', StoryController.storyDetail)
router.patch('/:storyId/vote', authentication, StoryController.vote)
router.get('/:storyId/:chapterId', chapterController.read)

router.use(errorHandler)

module.exports = router