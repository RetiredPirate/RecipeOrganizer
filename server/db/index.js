const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const createModel = require("./models")

const adapter = new FileSync("db/db.json")
const db = low(adapter)

db.defaults({ ingredients: [], users: [], recipes: [] })

module.exports = {
  models: {
    User: createModel(db, "users"),
    Recipe: createModel(db, "recipes"),
    Ingredient: createModel(db, "ingredients"),
  },
  db,
}
