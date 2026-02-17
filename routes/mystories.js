const express = require('express')
const router = express.Router()
const MyStoryController = require('../controllers/myStoryController')
const authZ = require('../middleware/authZ')
const chapterController = require('../controllers/chapterController')

router.get('/', MyStoryController.listAll)
router.post('/', MyStoryController.add)
router.put('/:storyId', authZ, MyStoryController.edit)
router.post('/:storyId/tag/:tagId', authZ, MyStoryController.addTag)
router.delete('/:storyId', authZ, MyStoryController.delete)
router.post('/:storyId/chapters', authZ, chapterController.add)
router.put('/:storyId/chapters/:chapterId', authZ, chapterController.edit)
router.delete('/:storyId/chapters/:chapterId', authZ, chapterController.delete)

module.exports = router