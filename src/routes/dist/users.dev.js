"use strict";

var express = require('express');

var router = express.Router();

var dbQuery = require('../controllers/db_query');

var validator = require('../validators/validate');

var formidable = require('formidable');

var fs = require('fs');

var _require = require('../app'),
    path = _require.path;

router.get('/', function _callee(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(dbQuery.getUsers());

        case 2:
          result = _context.sent;
          res.render('users', {
            data: result
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/:id', function _callee2(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(dbQuery.getUser(req.params.id));

        case 2:
          result = _context2.sent;
          console.log(result);

          if (result.length !== 0) {
            res.render('user', {
              data: result
            });
          } else {
            res.status(404);
            res.send('not found');
          }

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.get('/:id/edit', function _callee3(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(dbQuery.getUser(req.params.id));

        case 2:
          result = _context3.sent;

          if (result.length !== 0) {
            res.render('edit', {
              uId: result[0].uId,
              uName: result[0].uName,
              uEmail: result[0].uEmail,
              uImage: result[0].uImage
            });
          } else {
            res.status(404);
            res.send('not found');
          }

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post('/:id/edit', function _callee5(req, res) {
  var form, fileError, noImageFlag;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          form = new formidable.IncomingForm();
          noImageFlag = false;
          form.parse(req, function _callee4(err, fields, files) {
            var result, formError, _result;

            return regeneratorRuntime.async(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return regeneratorRuntime.awrap(validator.validateUpdate(fields.iName, fields.iEmail));

                  case 2:
                    result = _context4.sent;

                    if (!(result.details || fileError)) {
                      _context4.next = 8;
                      break;
                    }

                    if (fileError) formError = fileError;else formError = result.details[0].message;
                    res.render('edit', {
                      err: formError,
                      uId: req.params.id,
                      uName: fields.iName,
                      uEmail: fields.iEmail
                    });
                    _context4.next = 23;
                    break;

                  case 8:
                    if (!noImageFlag) {
                      _context4.next = 20;
                      break;
                    }

                    _context4.prev = 9;
                    _context4.next = 12;
                    return regeneratorRuntime.awrap(dbQuery.getUser(req.params.id));

                  case 12:
                    _result = _context4.sent;
                    console.log('image', _result[0].uImage);
                    fs.unlink(__dirname + '/../public/images/profile/' + req.params.id + '/' + _result[0].uImage, function (err) {
                      if (err) console.log(new Error(err));
                      console.log(_result[0].uImage + ' deleted.');
                    }); // iles.path()

                    _context4.next = 20;
                    break;

                  case 17:
                    _context4.prev = 17;
                    _context4.t0 = _context4["catch"](9);
                    console.log(new Error(_context4.t0));

                  case 20:
                    _context4.next = 22;
                    return regeneratorRuntime.awrap(dbQuery.updateUser(req.params.id, fields.iName, fields.iEmail, files.imageFile.name));

                  case 22:
                    res.redirect('/users');

                  case 23:
                  case "end":
                    return _context4.stop();
                }
              }
            }, null, null, [[9, 17]]);
          });
          form.on('fileBegin', function (name, file) {
            if (file.name && file.name.match(/\.(jpg|jpeg|png)$/i)) file.path = __dirname + '/../public/images/profile/' + req.params.id + '/' + file.name;else if (file.name && !file.name.match(/\.(jpg|jpeg|png)$/i)) fileError = 'Image format should be jpg or png.';else if (!file.name) {
              noImageFlag = true;
            }
          });

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = router;