const userUpdateSchema = require('./schemas/user-update');

function validateUpdate(name, email) {

  return new Promise(async (resolve, reject) => {
    try {
      const value = await userUpdateSchema.validateAsync({
        name: name,
        email: email
      });
      resolve(value);
    } catch (err) {
      resolve(err);
    }
  });
}

module.exports.validateUpdate = validateUpdate;