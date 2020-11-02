const env = process.env.NODE_ENV

const dev = {
  DBHost: "mongodb://localhost/recipeorganizer"
}

const prod = {
  DBHost: "Prod Database URL"
}

const configs = {
  dev,
  prod
}

module.exports = configs[env]