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
  isNameValid,
  isEmailValid,
  isPasswordValid,
  isTokenValid,
  isPostCategoryValid,
  isGetCategoryValid,
} = require('../middleware/validation');

const postUserValid = [isNameValid, isEmailValid, isPasswordValid];
const postLoginValid = [isEmailValid, isPasswordValid];

routes.post('/login', postLoginValid, login);

routes.post('/categories', isPostCategoryValid, postCategory);
routes.get('/categories', isGetCategoryValid, getCategories);

routes.get('/user', isTokenValid, getUsers);
routes.get('/user/:id', isTokenValid, getUserById);
routes.post('/user', postUserValid, postUser);
// routes.delete('/:id', );

module.exports = routes;
