const mongoose = require("mongoose")
const Recipe = require('./Recipe')
const User = require('./User')
const config = require('../../config')

mongoose.connect(config.DBHost, {
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