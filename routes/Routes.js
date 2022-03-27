const express = require('express');

const routes = express.Router();

const { 
  getUsers,
  post,
} = require('../controller/userController');

  const { login } = require('../controller/login');

const { 
  isNameValid,
  isEmailValid,
  isPasswordValid,
  isTokenValid,
} = require('../middleware/validation');

const postUserValid = [isNameValid, isEmailValid, isPasswordValid];
const postLoginValid = [isEmailValid, isPasswordValid];

// routes.get('/', getUserByEmail);
routes.post('/login', postLoginValid, login);
routes.get('/user', isTokenValid, getUsers);
routes.post('/user', postUserValid, post);
// routes.put('/:id', );
// routes.delete('/:id', );

module.exports = routes;
