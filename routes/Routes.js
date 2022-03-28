const express = require('express');

const routes = express.Router();

const { 
  getUsers,
  getUserById,
  postUser,
  postCategory,
  getCategories,
} = require('../controller/userController');

  const { login } = require('../controller/login');

const { 
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
  isTokenValid,
  isNameValid,
} = require('../middleware/validation');

const postUserValid = [isDisplayNameValid, isEmailValid, isPasswordValid];
const postLoginValid = [isEmailValid, isPasswordValid];
const categoryValid = [isTokenValid, isNameValid];

routes.post('/login', postLoginValid, login);

routes.post('/categories', categoryValid, postCategory);
routes.get('/categories', isTokenValid, getCategories);

routes.get('/user', isTokenValid, getUsers);
routes.get('/user/:id', isTokenValid, getUserById);
routes.post('/user', postUserValid, postUser);
// routes.delete('/:id', );

module.exports = routes;
