/**
 * Validator for search function.
 *
 * @author Thanh Tran
 * @version 1.0.0
 */

/**
 * Checks if user is logged in, by checking if user is stored in session.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export function auth (req, res, next) {
  if (!req.session || !req.session.username) {
    res.status(401).json({
      message: 'You must be logged in.'
    })
  } else {
    next()
  }
}
