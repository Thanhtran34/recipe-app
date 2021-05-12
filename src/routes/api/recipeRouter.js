/**
 * Recipe router.
 *
 * @author Thanh Tran
 * @version 1.0.0
 */

import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { RecipeController } from '../../controllers/api/recipeController.js'

export const router = express.Router()

const controller = new RecipeController()

/**
 * Authenticates requests.
 *
 * If authentication is successful, `req.user`is populated and the
 * request is authorized to continue.
 * If authentication fails, an unauthorized response will be sent.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticateJWT = (req, res, next) => {
  const authorization = req.headers.authorization?.split(' ')

  if (authorization?.[0] !== 'Bearer') {
    next(createError(401))
    return
  }

  try {
    const payload = jwt.verify(authorization[1], process.env.ACCESS_TOKEN_SECRET)
    req.user = {
      email: payload.sub,
      userId: payload.userId
    }

    next()
  } catch (err) {
    next(createError(403))
  }
}

// ------------------------------------------------------------------------------
//  Routes
// ------------------------------------------------------------------------------

// Provide req.task to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => controller.loadRecipe(req, res, next, id))

// GET tasks
router.get('/get', authenticateJWT, (req, res, next) => controller.findAll(req, res, next))

// GET tasks/:id
router.get('/:id',
  authenticateJWT, (req, res, next) => controller.find(req, res, next))

// POST tasks
router.post('/post',
  authenticateJWT, (req, res, next) => controller.create(req, res, next))

// PUT tasks/:id
router.put('/:id',
  authenticateJWT,
  (req, res, next) => controller.hasPermission(req, res, next),
  (req, res, next) => controller.update(req, res, next))

// DELETE tasks/:id
router.delete('/:id',
  authenticateJWT,
  (req, res, next) => controller.hasPermission(req, res, next),
  (req, res, next) => controller.delete(req, res, next))
