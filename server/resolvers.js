const { ForbiddenError } = require("apollo-server")

module.exports = {
  Query: {
    user: (_, __, { user, models }) => {
      return models.User.findOne({ id: user.id })
    },
    recipe: (_, { id }, { user, models }) => {
      const recipe = models.Recipe.findOne({ id: id })
      if (recipe.authorId !== user.id) {
        throw new ForbiddenError("not authorized to access this recipe")
      }
      return recipe
    }
  },
  Mutation: {
    signup: (_, { signup }, { models, createToken }) => {
      const existing = models.User.findOne({
        email: signup.credentials.email,
      })

      if (existing) {
        throw new Error("nope")
      }
      const user = models.User.createOne({
        email: signup.credentials.email,
        password: signup.credentials.password,
        firstName: signup.firstName,
        lastName: signup.lastName,
      })
      const token = createToken(user.id)
      return { user, token }
    },
    signin(_, { credentials }, { models, createToken }) {
      const user = models.User.findOne({
        email: credentials.email,
        password: credentials.password,
      })

      if (!user) {
        throw new Error("nope")
      }

      const token = createToken(user.id)
      return { user, token }
    },
    newRecipe(_, newRecipe, { models, user }) {
      const recipe = models.Recipe.createOne({
        ...newRecipe.recipe,
        authorId: user.id,
      })
      return recipe
    },
  },
  User: {
    recipes(root, _, { user, models }) {
      return models.Recipe.findMany({ authorId: root.id })
    },
  },
}
