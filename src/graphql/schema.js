const { buildSchema } = require('graphql')

//graphql schema
const schema = buildSchema(`
  type User {
    uId: Int!
    uName: String!
    uEmail: String!
  }
  type Query {
    user(id: Int!): [User],
    users: [User]
  },
  type Mutation {
    updateUser(id: Int!, name: String!, email: String!): [User]
  }
`);

module.exports = schema;