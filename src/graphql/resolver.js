const User = require('../controllers/db_query');
// const User = require('../User');

// The root provides a resolver function for each API endpoint
const root = {
  users: async () => {
    const users = await User.getUsers();
    return users;
  },
  user: async ({ id }) => {
    const user = await User.getUser(id);
    return user;
  }
};

module.exports = root;