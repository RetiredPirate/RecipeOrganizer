const { gql } = require("apollo-server")

const typeDefs = gql`
  directive @authenticated on FIELD_DEFINITION

  type Recipe {
    id: ID!
    name: String!
    notes: String!
    ingredients: [Ingredient!]!
    instructions: [String!]!
  }

  type Ingredient {
    name: String!
    amount: Amount!
  }

  type Amount {
    unit: String!
    quantity: Float!
  }

  type ShoppingList {
    items: [ShoppingListItem!]!
  }

  type ShoppingListItem {
    ingredient: Ingredient!
    recipe: Recipe
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    recipes: [Recipe!]!
    shoppingLists: [ShoppingList!]!
  }

  input NewRecipeInput {
    name: String!
    notes: String!
    ingredients: [NewIngredientInput!]!
    instructions: [String!]!
  }

  input NewIngredientInput {
    name: String!
    amount: NewAmountInput!
  }

  input NewAmountInput {
    unit: String!
    quantity: Float!
  }

  input SignupInput {
    credentials: CredentialsInput!
    firstName: String!
    lastName: String!
  }

  input CredentialsInput {
    email: String!
    password: String!
  }

  type SessionInfo {
    user: User!
    token: String!
  }

  type Query {
    user: User! @authenticated
    recipe(id: ID!): Recipe!
  }

  type Mutation {
    signup(signup: SignupInput!): SessionInfo!
    signin(credentials: CredentialsInput!): SessionInfo!
    newRecipe(recipe: NewRecipeInput!): Recipe! @authenticated
  }
`

module.exports = typeDefs
