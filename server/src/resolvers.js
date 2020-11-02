const { ForbiddenError } = require("apollo-server")
const bcrypt = require("bcrypt")

const SALT_ROUNDS = 10

module.exports = {
  Query: {
    user: async (_, __, { user, models }) => {
      return await models.User.findById(user.id)
    },
    recipe: async (_, { id }, { user, models }) => {
      const recipe = await models.Recipe.findById(id)
      if (recipe.authorId !== user.id) {
        throw new ForbiddenError("not authorized to access this recipe")
      }
      return recipe
    },
  },
  Mutation: {
    signup: async (_, { signup }, { models, createToken }) => {
      const existing = await models.User.findOne({
        email: signup.credentials.email,
      })

      if (existing) {
        throw new ForbiddenError("The specified email already exists.")
      }

      const passwordHash = await bcrypt.hash(
        signup.credentials.password,
        SALT_ROUNDS
      )

      const user = await models.User.create({
        email: signup.credentials.email,
        passwordHash,
        firstName: signup.firstName,
        lastName: signup.lastName,
      })

      const token = createToken(user.id)
      return { user, token }
    },
    signin: async (_, { credentials }, { models, createToken }) => {
      const user = await models.User.findOne({ email: credentials.email })

      const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        user.passwordHash
      )

      if (!isPasswordCorrect) {
        throw new ForbiddenError("Email and password not recognised.")
      }

      const token = createToken(user.id)
      return { user, token }
    },
    newRecipe: async (_, newRecipe, { models, user }) => {
      console.log(user.id)

      const recipe = await models.Recipe.create({
        ...newRecipe.recipe,
        authorId: user.id,
      })
      return recipe
    },
  },
  User: {
    recipes: async (root, _, { user, models }) => {
      return await models.Recipe.find({ authorId: root.id })
    },
  },
}
