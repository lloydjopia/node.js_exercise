"use strict";

var User = require('../controllers/db_query'); // const User = require('../User');
// The root provides a resolver function for each API endpoint


var root = {
  users: function users() {
    var users;
    return regeneratorRuntime.async(function users$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(User.getUsers());

          case 2:
            users = _context.sent;
            return _context.abrupt("return", users);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  user: function user(_ref) {
    var id, user;
    return regeneratorRuntime.async(function user$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = _ref.id;
            _context2.next = 3;
            return regeneratorRuntime.awrap(User.getUser(id));

          case 3:
            user = _context2.sent;
            return _context2.abrupt("return", user);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};
module.exports = root;