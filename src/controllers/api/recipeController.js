/**
 * Module for the RecipeController.
 *
 * @author Thanh Tran
 * @version 1.0.0
 */

import createError from 'http-errors'
import { Recipe } from '../../models/recipe.js'

/**
 * Encapsulates a controller.
 */
export class RecipeController {
  /**
   * Provide req.recipe to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the recipe to load.
   */
  async loadRecipe (req, res, next, id) {
    try {
      // Get the recipe.
      const recipe = await Recipe.getById(id)

      // If no recipe found send a 404 (Not Found).
      if (!recipe) {
        next(createError(404))
        return
      }

      // Provide the recipe to req.
      req.recipe = recipe

      // Next middleware.
      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing a recipe.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async find (req, res, next) {
    res.json(req.recipe)
  }

  /**
   * Sends a JSON response containing all recipes.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findAll (req, res, next) {
    try {
      const recipes = await Recipe.getAll()
      res.json(recipes)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new recipe .
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async create (req, res, next) {
    try {
      const recipe = await Recipe.insert({
        creator: req.user.userId,
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        category: req.body.category
      })
      await recipe.save()

      res
        .status(201)
        .json(recipe)
    } catch (error) {
      let err = error
      if (error.name === 'ValidationError') {
        // Validation error(s)
        err = createError(400)
        err.innerException = error
      }

      next(err)
    }
  }

  /**
   * Updates a specific recipe.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async update (req, res, next) {
    try {
      await req.recipe.update({
        title: req.body.title,
        category: req.body.category,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
      })

      res
        .status(204)
        .end()
    } catch (error) {
      let err = error
      if (error.name === 'ValidationError') {
        // Validation error(s).
        err = createError(400)
        err.innerException = error
      }

      next(err)
    }
  }

  /**
   * Deletes the specified recipe.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async delete (req, res, next) {
    try {
      await req.recipe.delete()

      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Authorize the user..
   *
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async hasPermission (req, res, next) {
    try {
      const recipeId = await Recipe.findOne({ _id: req.params.id })
      const author = recipeId.creator
      const player = req.user.userId
      if (author.localeCompare(player) === 0) {
        next()
      } else {
        res.status(403).json('\u{1f914}' + ' Obs, not owner of recipe!')
        res.redirect('/')
      }
    } catch (err) {
      next(err)
    }
  }
}
