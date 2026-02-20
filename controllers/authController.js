const { OAuth2Client } = require('google-auth-library');
const { comparePassword, hashPassword } = require('../helper/bcrypt');
const { signToken } = require('../helper/jwt');
const {User} = require('../models')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
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
  static async googleLogin (req, res, next) {
    try {
      const {access_token_google} = req.headers
      if (!access_token_google) {
        throw {
          name: 'googleLoginError',
          message: 'Access token from Google is required'
        }
      }
      const ticket = await client.verifyIdToken({
        idToken: access_token_google,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      const payload = ticket.getPayload();

      if (!payload.email_verified) {
        throw {
          name: 'googleLoginError',
          message: 'Email not verified by Google'
        }
      }

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email
        },
        defaults: {
          username: payload.name,
          password: hashPassword(Math.random().toString(36).slice(-8)),
          role: 'user'
        }
      })

      const access_token = signToken({
        id: user.id,
        email: user.email,
        role: user.role
      })
      res.status(200).json({
        access_token
      })
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController