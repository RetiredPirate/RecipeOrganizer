const jwt = require("jsonwebtoken")
const { models } = require("./db")
const secret = "catpack"
const { AuthenticationError, ForbiddenError } = require("apollo-server")

/**
 * takes a user object and creates  jwt out of it
 * using user.id and user.role
 * @param {Object} user the user to create a jwt for
 */
const createToken = id => jwt.sign({ id }, secret)

/**
 * will attemp to verify a jwt and find a user in the
 * db associated with it. Catches any error and returns
 * a null user
 * @param {String} token jwt from client
 */
const getUserFromToken = async token => {
  try {
    const { id } = jwt.verify(token, secret)
    const user = await models.User.findById(id)
    return user
  } catch (e) {
    return null
  }
}

/**
 * checks if the user is on the context object
 * continues to the next resolver if true
 * @param {Function} next next resolver function ro run
 */
const authenticated = next => (root, args, context, info) => {
  if (!context.user) {
    throw new AuthenticationError("User is not authenitcated")
  }

  return next(root, args, context, info)
}

/**
 * checks if the user on the context has the specified role.
 * continues to the next resolver if true
 * @param {String} role enum role to check for
 * @param {Function} next next resolver function to run
 */
const authorized = (role, next) => (root, args, context, info) => {
  if (context.user.role !== role) {
    throw new ForbiddenError("User is not authorized")
  }

  return next(root, args, context, info)
}

module.exports = {
  getUserFromToken,
  authenticated,
  authorized,
  createToken,
}
