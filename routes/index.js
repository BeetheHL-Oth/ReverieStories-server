const express = require('express')
const router = express.Router()
const authRouter = require('./users')
const storiesRouter = require('./stories')
const myStoriesRouter = require('./mystories')
const tagsRouter = require('./tags')
const myCharacterRouter = require('./mycharacter')
const authentication = require('../middleware/authentication')
const errorHandler = require('../middleware/errorHandler')

router.use('/users', authRouter)
router.use('/stories', storiesRouter)
router.use('/tags', tagsRouter)
router.use('/mystories', authentication, myStoriesRouter)
router.use('/mycharacter', authentication, myCharacterRouter)

router.use(errorHandler)

module.exports = router