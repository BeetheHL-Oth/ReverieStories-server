const express = require('express')
const router = express.Router()
const authRouter = require('./users')
const storyRouter = require('./stories')
const myStoriesRouter = require('./mystories')

router.use('/users', authRouter)
router.use('/stories', storyRouter)
router.use('/mystories', myStoriesRouter)

module.exports = router