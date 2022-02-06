const { ApolloServer } = require("apollo-server-express")
const { merge } = require("lodash")

const commonResolver = require("./Common/resolvers")
const userResolver = require("./Users/resolver")
const dayResolver = require("./Day/resolver")
const mealResolver = require("./Meal/resolver")
const saltResolver = require("./Salt/resolver")
const snackResolver = require("./Snack/resolver")
const defSupResolver = require("./DefaultSup/resolver")
const supplementResolver = require("./Supplement/resolver")
const waterResolver = require("./Water/resolver")

const commonTypeDef = require("./Common/schema.gql")
const userTypeDef = require("./Users/schema.gql")
const dayTypeDef = require("./Day/schema.gql")
const mealTypeDef = require("./Meal/schema.gql")
const saltTypeDef = require("./Salt/schema.gql")
const snackTypeDef = require("./Snack/schema.gql")
const defSupTypeDef = require("./DefaultSup/schema.gql")
const supplementTypeDef = require("./Supplement/schema.gql")
const waterTypeDef = require("./Water/schema.gql")

const commonMutations = require("./Common/mutation")
const userMutations = require("./Users/mutations")
const dayMutations = require("./Day/mutations")
const mealMutations = require("./Meal/mutations")
const saltMutations = require("./Salt/mutations")
const snackMutations = require("./Snack/mutations")
const defSupMutations = require("./DefaultSup/mutations")
const supplementMutations = require("./Supplement/mutations")
const waterMutations = require("./Water/mutations")

const queries = merge(
  commonResolver,
  userResolver,
  dayResolver,
  mealResolver,
  saltResolver,
  snackResolver,
  defSupResolver,
  supplementResolver,
  waterResolver
)
const mutations = merge(
  commonMutations,
  userMutations,
  dayMutations,
  mealMutations,
  saltMutations,
  snackMutations,
  defSupMutations,
  supplementMutations,
  waterMutations
)
const resolvers = merge(queries, mutations)

const context = request => {
  const userId = request.req.userId
  const username = request.req.username
  const role = request.req.role

  return { request, userId, username, role }
}

const apolloServer = new ApolloServer({
  context,
  resolvers,
  typeDefs: [
    commonTypeDef,
    userTypeDef,
    dayTypeDef,
    mealTypeDef,
    saltTypeDef,
    snackTypeDef,
    defSupTypeDef,
    supplementTypeDef,
    waterTypeDef
  ]
})

module.exports = { apolloServer }
