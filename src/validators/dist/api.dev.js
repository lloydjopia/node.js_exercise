"use strict";

var _require = require('graphql'),
    buildSchema = _require.buildSchema; //graphql schema


var schema = buildSchema("\n  type User {\n    id: Int!\n    name: String!\n    email: String!\n  }\n  type Query {\n    user: User,\n    users: [User]\n  }\n");
module.exports = schema;