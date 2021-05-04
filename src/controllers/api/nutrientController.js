/**
 * Module for the NutrientController.
 *
 * @author Thanh Tran
 * @version 1.0.0
 */
import request from 'request'

/**
 * Encapsulates a controller.
 */
export class NutrientController {
  /** Search for all foods.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   *
   */
  search (req, res, next) {
    const options = {
      url: 'https://api.nal.usda.gov/fdc/v1/foods/search',
      method: 'GET',
      qs: {
        pageSize: 1,
        api_key: 'X6IgqGKeclBEDud4FAfR7kIsl1erjAhPtzf5Jgpx',
        query: req.body.query,
        dataType: ['Survey (FNDDS)']
      }
    }

    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        body = JSON.parse(body)
        if (!body.errors) {
          res.json({
            name: body.foods[0].description,
            calories: body.foods[0].foodNutrients.find((nutrient) => nutrient.nutrientName.toLowerCase().includes('energy')).nutrientNumber,
            protein: body.foods[0].foodNutrients.find((nutrient) => nutrient.nutrientName.toLowerCase().includes('protein')).nutrientNumber,
            caffein: body.foods[0].foodNutrients.find((nutrient) => nutrient.nutrientName.toLowerCase().includes('caffein')).nutrientNumber,
            sugar: body.foods[0].foodNutrients.find((nutrient) => nutrient.nutrientName.toLowerCase().includes('sugar')).nutrientNumber,
            cholesterol: body.foods[0].foodNutrients.find((nutrient) => nutrient.nutrientName.toLowerCase().includes('cholesterol')).nutrientNumber,
            carbs: body.foods[0].foodNutrients.find((nutrient) => nutrient.nutrientName.toLowerCase().includes('carb')).nutrientNumber,
            fat: body.foods[0].foodNutrients.find((nutrient) => nutrient.nutrientName.toLowerCase().includes('fat')).nutrientNumber
          })
        } else {
          res.json({
            results: [],
            total: 0
          })
        }
      } else {
        res.status(500).json({
          message: 'An error occured.'
        })
      }
    })
  }
}
