const express = require('express')
const router = express.Router()
const TagController = require('../controllers/tagController')
const authentication = require('../middleware/authentication')
const adminCheck = require('../middleware/adminCheck')
const errorHandler = require('../middleware/errorHandler')

router.get('/', TagController.listAll)
router.post('/', authentication, adminCheck, TagController.add)
router.delete('/:tagId', authentication, adminCheck, TagController.delete)

router.use(errorHandler)

module.exports = router