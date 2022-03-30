const express = require('express');

const routes = express.Router();

const { 
  getUsers,
  getUserById,
  postUser,
  deleteUser,
} = require('../controller/userController');

const { 
  getCategories,
  postCategory,
} = require('../controller/categoryController');

const {
  getBlogPosts,
  postBlogPost,
} = require('../controller/blogPostController');

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
const postBlogPostValid = [isPostValid, isCategoryId, isTokenValid];

// login
routes.post('/login', postLoginValid, login);

// categories
routes.post('/categories', categoryValid, postCategory);
routes.get('/categories', isTokenValid, getCategories);

// user
routes.get('/user', isTokenValid, getUsers);
routes.get('/user/:id', isTokenValid, getUserById);
routes.post('/user', postUserValid, postUser);
routes.delete('/user/me', isTokenValid, deleteUser);

// post
routes.post('/post', postBlogPostValid, postBlogPost);
routes.get('/post', isTokenValid, getBlogPosts);

module.exports = routes;
