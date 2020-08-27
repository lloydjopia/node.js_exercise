const express = require('express');
const router = express.Router();
const dbQuery = require('../controllers/db_query');
const validator = require('../validators/validate');
const formidable = require('formidable');
const fs = require('fs');
const { path } = require('../app');


router.get('/', async function(req, res) {
  const result = await dbQuery.getUsers();
  res.render('users', {
    data: result
  });
});


router.get('/:id', async function(req, res) {
  const result = await dbQuery.getUser(req.params.id);
  console.log(result);
  if(result.length !== 0) {
    res.render('user', {
      data: result
    });
  } else {
    res.status(404);
    res.send('not found');
  }
});


router.get('/:id/edit', async function(req, res) {
  const result = await dbQuery.getUser(req.params.id);

  if(result.length !== 0) {
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
});


router.post('/:id/edit', async (req, res) => {
  const form = new formidable.IncomingForm();
  var fileError;
  var noImageFlag = false;

  form.parse(req, async (err, fields, files) => {
    const result = await validator.validateUpdate(fields.iName, fields.iEmail);

    var formError;

    if (result.details || fileError) {
      if (fileError)
        formError = fileError;
      else
        formError = result.details[0].message;

      res.render('edit', {
        err: formError,
        uId: req.params.id,
        uName: fields.iName,
        uEmail: fields.iEmail
      });
    } else {
      if (noImageFlag) {
        try {
          const result = await dbQuery.getUser(req.params.id);
          console.log('image', result[0].uImage);
          fs.unlink(__dirname + '/../public/images/profile/' + req.params.id + '/' + result[0].uImage, (err) => {
            if(err)
              console.log(new Error(err));
            console.log(result[0].uImage + ' deleted.')
          });
          // iles.path()
        } catch (err) {
          console.log(new Error(err));
        }
      }
      await dbQuery.updateUser(req.params.id, fields.iName, fields.iEmail, files.imageFile.name);
      res.redirect('/users');
    }
  })

  form.on('fileBegin', (name, file) => {
    if (file.name && file.name.match(/\.(jpg|jpeg|png)$/i))
      file.path = __dirname + '/../public/images/profile/' + req.params.id + '/' + file.name;
    else if (file.name && !file.name.match(/\.(jpg|jpeg|png)$/i)) 
      fileError = 'Image format should be jpg or png.';
    else if (!file.name) {
      noImageFlag = true;
    }
  });
});


module.exports = router;