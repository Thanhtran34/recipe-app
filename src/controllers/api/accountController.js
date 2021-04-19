/**
 * Module for AccountController.
 *
 * @author Thanh Tran
 * @version 1.0.0
 */
import Validator from 'validator'
import isEmpty from 'is-empty'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import { User } from '../../models/user.js'

/**
 * Encapsulate a controller.
 */
export class AccountController {
  /**
   * Method to validate a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  validateRegisterInput (req, res, next) {
    try {
      const errors = {}

      req.body.username = !isEmpty(req.body.username) ? req.body.username : ''
      req.body.email = !isEmpty(req.body.email) ? req.body.email : ''
      req.body.password = !isEmpty(req.body.password) ? req.body.password : ''
      req.body.password2 = !isEmpty(req.body.password2) ? req.body.password2 : ''

      if (Validator.isEmpty(req.body.username)) {
        errors.username = 'Username is required'
      }

      if (Validator.isEmpty(req.body.email)) {
        errors.email = 'Email is required'
      } else if (!Validator.isEmail(req.body.email)) {
        errors.email = 'Not a valid email'
      }

      if (Validator.isEmpty(req.body.password)) {
        errors.password = 'Password is required'
      }

      if (Validator.isEmpty(req.body.password2)) {
        errors.password2 = 'Password is required twice times'
      }

      if (!Validator.isLength(req.body.password, { min: 7 })) {
        errors.password = 'Password must be minst 7 characters long'
      }
      // Making sure the passwords are identical
      if (!Validator.equals(req.body.password, req.body.password2)) {
        errors.password2 = 'Password must be matched'
      }

      if (!isEmpty(errors)) {
        res.status(400).json(errors)
      } else next()
    } catch (err) {
      next(err)
    }
  }

  /**
   * Method to validate login user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  validateLoginInput (req, res, next) {
    try {
      const errors = {}
      // Convert empty fields to an empty string so we can use validator functions
      req.body.email = !isEmpty(req.body.email) ? req.body.email : ''
      req.body.password = !isEmpty(req.body.password) ? req.body.password : ''
      // Email checks
      if (Validator.isEmpty(req.body.email)) {
        errors.email = 'Email is required'
      } else if (!Validator.isEmail(req.body.email)) {
        errors.email = 'This email is not matched. Try again!'
      }
      // Password checks
      if (Validator.isEmpty(req.body.password)) {
        errors.password = 'Password is required'
      }

      if (!isEmpty(errors)) {
        res.status(400).json(errors)
      } else next()
    } catch (err) {
      next(err)
    }
  }

  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      const user = await User.authenticate(req.body.email, req.body.password)

      const payload = {
        sub: user.email,
        given_name: user.username,
        userId: user.id
      }

      // Create the access token with the shorter lifespan.
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })

      res
        .status(200)
        .json({
          access_token: accessToken,
          userId: user.id
        })
    } catch (error) {
      // Authentication failed.
      next(createError(401))
    }
  }

  /**
   * Registers a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      const user = await User.insert({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })

      jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })

      res
        .status(200)
        .json({ userId: user.id })
    } catch (error) {
      next(createError(409))
    }
  }
}
