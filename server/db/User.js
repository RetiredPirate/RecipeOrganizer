const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: String,
  passwordHash: String,
  firstName: String,
  lastName: String,
})

module.exports = model("User", userSchema)