const express = require('express');

const routes = express.Router();

const { 
  getUsers,
  getUserById,
  postUser,
  postCategory,
  getCategories,
  postPost,
} = require('../controller/userController');

  const { login } = require('../controller/login');

const { 
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
  isTokenValid,
  isNameValid,
  isPostValid,
  isCategoryId,
} = require('../middleware/validation');

const postUserValid = [isDisplayNameValid, isEmailValid, isPasswordValid];
const postLoginValid = [isEmailValid, isPasswordValid];
const categoryValid = [isTokenValid, isNameValid];
const postValid = [isPostValid, isCategoryId, isTokenValid];

routes.post('/login', postLoginValid, login);

routes.post('/categories', categoryValid, postCategory);
routes.get('/categories', isTokenValid, getCategories);

routes.get('/user', isTokenValid, getUsers);
routes.get('/user/:id', isTokenValid, getUserById);
routes.post('/user', postUserValid, postUser);

routes.post('/post', postValid, postPost);

module.exports = routes;
