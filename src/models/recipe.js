/**
 * Mongoose model Recipe.
 *
 * @author Thanh Tran
 * @version 1.0.0
 */
import mongoose from 'mongoose'

/**
 * Create a schema for recipes.
 *
 */
const schema = new mongoose.Schema({
  creator: { type: String },
  title: { type: String, required: true },
  ingredients: { type: [], required: true },
  instructions: { type: String, required: true },
  category: { type: String, required: true }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret._id
    },
    virtuals: true // ensure virtual fields are serialized
  }
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

/**
 * Gets all recipes.
 *
 * @returns {Promise<Recipe[]>} The Promise to be fulfilled.
 */
schema.statics.getAll = async function () {
  return this.find({})
}

/**
 * Gets a recipe by ID.
 *
 * @param {string} id - The value of the id for the recipe to get.
 * @returns {Promise<Recipe>} The Promise to be fulfilled.
 */
schema.statics.getById = async function (id) {
  return this.findOne({ _id: id })
}

/**
 * Inserts a new recipe.
 *
 * @param {object} recipeData - ...
 * @returns {Promise<Recipe>} The Promise to be fulfilled.
 */
schema.statics.insert = async function (recipeData) {
  const recipe = new Recipe(recipeData)
  return recipe.save()
}

/**
 * Updates a recipe.
 *
 * @param {object} recipeData - ...
 * @returns {Promise} The Promise to be fulfilled.
 */
schema.methods.update = async function (recipeData) {
  if (recipeData.title?.localeCompare(this.title) !== 0) {
    this.title = recipeData.title
  }

  if (recipeData.ingredients !== this.ingredients) {
    this.ingredients = recipeData.ingredients
  }

  if (recipeData.instructions?.localeCompare(this.instructions) !== 0) {
    this.instructions = recipeData.instructions
  }

  return this.save()
}

/**
 * Deletes a recipe.
 *
 * @returns {Promise} The Promise to be fulfilled.
 */
schema.methods.delete = async function () {
  return this.remove()
}

/**
 * Create a model using the schema.
 *
 */
export const Recipe = mongoose.model('Recipes', schema)
