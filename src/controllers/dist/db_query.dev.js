"use strict";

var dbConn = require('../utils/db_conn');

function getUsers() {
  return new Promise(function (resolve, reject) {
    var sql = "SELECT * FROM user";
    dbConn.query(sql, function (err, result) {
      if (err) resolve(new Error('Something went wrong.'));
      resolve(result);
    });
  });
}

function getUser(id) {
  return new Promise(function (resolve, reject) {
    var sql = "SELECT * FROM user WHERE uId = ?";
    dbConn.query(sql, [id], function (err, result) {
      if (err) resolve(new Error('Something went wrong.'));
      resolve(result);
    });
  });
}

function updateUser(id, name, email, image) {
  return new Promise(function (resolve, reject) {
    var sql = "UPDATE user SET uName=?, uEmail=?, uImage=? WHERE uId=?";
    dbConn.query(sql, [name, email, image, id], function (err, result) {
      if (err) {
        console.log('err', err);
        resolve(new Error(err.sqlMessage));
      }

      resolve(result);
    });
  });
}

Object.assign(module.exports, {
  getUsers: getUsers,
  getUser: getUser,
  updateUser: updateUser
});