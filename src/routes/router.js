/**
 * The routes.
 *
 * @author Thanh Tran
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { router as v1Router } from './api/router.js'

export const router = express.Router()

router.use('/api', v1Router)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => next(createError(404)))
