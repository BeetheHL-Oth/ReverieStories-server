const { OAuth2Client } = require('google-auth-library');
const { comparePassword } = require('../helper/bcrypt');
const { signToken } = require('../helper/jwt');
const {User} = require('../models')
const OauthSetup = new OAuth2Client(process.env.GOOGLE_OAUTH_ID)
class AuthController {
  static async register (req, res, next) {
    try {
      const data = req.body
      const response = await User.create(data);

      res.status(201).json({
        message: `Account for ${response.username} has been created successfully`,
        data: {
          username: response.username,
          email: response.email
        }
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async login (req, res, next) {
    try {
      const {email, password} = req.body

      if (!email || !password) {
        throw {
          name: 'LoginError',
          message: 'Email or Password required'
        }
      }

      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        throw {
          name: 'LoginError',
          message: 'Invalid Email or Password'
        }
      }

      if (!comparePassword(password, user.password)) {
        throw {
          name: 'LoginError',
          message: 'Invalid Email or Password'
        }
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role
      }

      const access_token = signToken(payload)

      res.status(200).json({
        access_token
      })
    }
    catch (error) {
      next(error)
    }
  }
  static async googleOAuth (req, res, next) {
    try {
      
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController