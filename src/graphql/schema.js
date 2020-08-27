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
  }
`);

module.exports = schema;