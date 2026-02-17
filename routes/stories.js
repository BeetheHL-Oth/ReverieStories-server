const express = require('express')
const router = express.Router()
const StoryController = require('../controllers/storyController')
const errorHandler = require('../middleware/errorHandler')

router.get('/', StoryController.listAll)
router.get('/:storyId', StoryController.storyDetail)

router.use(errorHandler)

module.exports = router