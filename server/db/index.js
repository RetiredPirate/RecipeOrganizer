const mongoose = require("mongoose")
const Recipe = require('./Recipe')
const User = require('./User')

mongoose.connect("mongodb://localhost/recipeorganizer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => console.log("Connected to MongoDB."))

module.exports = {
  models: {
    User,
    Recipe,
  },
}