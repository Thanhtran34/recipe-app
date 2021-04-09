/**
 * API router.
 *
 * @author Thanh Tran
 * @version 1.0.0
 */

import express from 'express'
import { router as accountRouter } from './accountRouter.js'
import { router as recipeRouter } from './recipeRouter.js'
import { router as usersRouter } from './userRouter.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Welcome to my recipe apps!' }))
router.use('/', accountRouter)
router.use('/recipe', recipeRouter)
router.use('/users', usersRouter)
