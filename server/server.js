const { ApolloServer } = require("apollo-server")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")
const { createToken, getUserFromToken } = require("./auth")
const db = require("./mdb")
const { AuthenticatedDirective } = require("./directives")

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    authenticated: AuthenticatedDirective,
  },
  async context({ req }) {
    const context = { ...db }
    const token = req.headers.authorization
    const user = await getUserFromToken(token)
    return { ...context, user, createToken }
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
