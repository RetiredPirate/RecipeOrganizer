const {
  SchemaDirectiveVisitor,
  AuthenticationError,
} = require("apollo-server")
const { defaultFieldResolver } = require("graphql")

class AuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolver = field.resolve || defaultFieldResolver

    field.resolve = async (root, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError("User is not authenticated")
      }

      return await resolver.call(this, root, args, context, info)
    }
  }
}

module.exports = {
  AuthenticatedDirective,
}
