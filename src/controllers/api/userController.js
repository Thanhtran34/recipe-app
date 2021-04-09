/**
 * Module for UserController.
 *
 * @author Thanh Tran
 * @version 1.0.0
 */
import createError from 'http-errors'
import { User } from '../../models/user.js'

/**
 * Encapsulate a controller.
 */
export class UserController {
  /**
   * Provide req.user to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the user to load.
   */
  async loadUser (req, res, next, id) {
    try {
      // Get the user.
      const user = await User.getById(id)

      // If no user found send a 404 (Not Found).
      if (!user) {
        next(createError(404))
        return
      }

      // Provide the user to req.
      req.user = user

      // Next middleware.
      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async find (req, res, next) {
    res.json(req.user)
  }
}
