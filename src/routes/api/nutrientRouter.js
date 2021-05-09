/**
 * Nutrient routes.
 *
 * @author Thanh Tran
 * @version 1.0.0
 */

import express from 'express'
import { NutrientController } from '../../controllers/api/nutrientController.js'

export const router = express.Router()

const controller = new NutrientController()

router.post('/search', (req, res, next) => {
  try {
    controller.search(req, res, next)
  } catch (error) {
    next(error)
  }
})
