const { nanoid: nano } = require("nanoid")
module.exports = {
  Query: {
    user: (_, __, { user, models }) => {
      if (!user) {
        throw new Error("no auth")
      }
      console.log(models.User.findOne({ id: user.id }))
      return models.User.findOne({ id: user.id })
    },
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
  },
}
