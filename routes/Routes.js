const express = require('express');

const routes = express.Router();

const { getUsers, post } = require('../controller/userController');

const { 
  isNameValid,
  isEmailValid,
  isPasswordValid,
 } = require('../middleware/validation');

const postValid = [isNameValid, isEmailValid, isPasswordValid];

routes.get('/', getUsers);
// routes.get('/:id',) ;
routes.post('/', postValid, post);
// routes.put('/:id', );
// routes.delete('/:id', );

module.exports = routes;
