const { nanoid: nano } = require("nanoid")
module.exports = {
  Query: {
    user: (_, __, { user }) => {
      return {
        id: "no",
        email: "fucker@fucker.com",
        socialSecurityNumber: 4123547123,
      }
    },
  },
  Mutation: {
    signup: (_, { signup }, { models, createToken }) => {
      const existing = models.User.findOne({
        credentials: { email: signup.credentials.email },
      })

      if (existing) {
        throw new Error("nope")
      }
      const user = models.User.createOne({
        ...signup,
      })
      const token = createToken(user.id)
      return { user, token }
    },
    signin(_, { credentials }, { models, createToken }) {
      const user = models.User.findOne({ credentials })

      if (!user) {
        throw new Error("nope")
      }

      const token = createToken(user.id)
      return { user, token }
    },
  },
}
