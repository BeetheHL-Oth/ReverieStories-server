const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_SECRET_KEY

function signToken(payload) {
  return jwt.sign(payload, secretKey)
}

function decodeToken(token) {
  try {
    return jwt.decode(token, secretKey)
  }
  catch (error) {
    return null
  }
}

module.exports = {signToken, decodeToken}