"use strict";

var _require = require('graphql'),
    buildSchema = _require.buildSchema; //graphql schema


var schema = buildSchema("\n  type User {\n    uId: Int!\n    uName: String!\n    uEmail: String!\n  }\n  type Query {\n    user(id: Int!): [User],\n    users: [User]\n  }\n");
module.exports = schema;