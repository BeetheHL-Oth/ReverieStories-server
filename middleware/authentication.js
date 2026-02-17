const { decodeToken } = require("../helper/jwt")
const { User } = require('../models')

async function authentication (req, res, next) {
  try {
    const authorization = req.headers.authorization

    if (!authorization) {
      throw {
        name: 'unauthorized',
        message: 'Authorization not found'
      }
    }

    const token = authorization.split(' ')[1]

    if (!token) {
      throw {
        name: 'unauthorized',
        message: 'Token not found'
      }
    }

    const payload = decodeToken(token)

    if (!payload) {
      throw {
        name: 'unauthorized',
        message: 'Invalid token'
      }
    }

    const user = await User.findOne({
      where: {
        id: payload.id,
        email: payload.email
      }
    })

    if (!user) {
      throw {
        name: 'unauthorized',
        message: 'User not found'
      }
    }

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    }

    next()
  }
  catch (error) {
    next(error)
  }
}

module.exports = authentication