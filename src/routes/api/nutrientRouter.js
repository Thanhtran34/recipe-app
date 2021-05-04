/**
 * Nutrient routes.
 *
 * @author Thanh Tran
 * @version 1.0.0
 */

import express from 'express'
// import { auth } from '../../config/auth.js'
import { NutrientController } from '../../controllers/api/nutrientController.js'
// import Joi from 'joi'

export const router = express.Router()

const controller = new NutrientController()

router.post('/search', (req, res, next) => {
  controller.search(req, res, next)
})
