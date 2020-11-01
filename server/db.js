const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/recipeorganizer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => console.log("Connected to MongoDB."))

const userSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
  firstName: String,
  lastName: String,
})

const recipeSchema = new mongoose.Schema({
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

module.exports = {
  models: {
    User: mongoose.model("User", userSchema),
    Recipe: mongoose.model("Recipe", recipeSchema),
  },
}
