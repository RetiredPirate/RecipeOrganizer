const { Schema, model } = require('mongoose')

const recipeSchema = new Schema({
  name: String,
  notes: String,
  authorId: String,
  instructions: [String],
  ingredients: [
    {
      name: String,
      unit: String,
      quantity: Number,
    },
  ],
})

module.exports = model("Recipe", recipeSchema)