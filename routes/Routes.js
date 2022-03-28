const express = require('express');

const routes = express.Router();

const { 
  getUsers,
  getUserById,
  postUser,
  postCategory,
} = require('../controller/userController');

  const { login } = require('../controller/login');

const { 
  isNameValid,
  isEmailValid,
  isPasswordValid,
  isTokenValid,
  isCategoryValid,
} = require('../middleware/validation');

const postUserValid = [isNameValid, isEmailValid, isPasswordValid];
const postLoginValid = [isEmailValid, isPasswordValid];

// routes.get('/', getUserByEmail);
routes.post('/login', postLoginValid, login);
routes.post('/categories', isCategoryValid, postCategory);
routes.get('/user', isTokenValid, getUsers);
routes.get('/user/:id', isTokenValid, getUserById);
routes.post('/user', postUserValid, postUser);
// routes.delete('/:id', );

module.exports = routes;
