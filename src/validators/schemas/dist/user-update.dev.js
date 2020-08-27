"use strict";

var Joi = require('Joi');

var schema = Joi.object({
  name: Joi.string().min(4).max(60).required(),
  email: Joi.string().email().required()
}).and('name', 'email');
module.exports = schema;