const express = require('express');

const routes = express.Router();

const { 
  getUsers,
  getUserById,
  postUser,
  deleteUser,
} = require('../controller/user');

const { 
  getCategories,
  postCategory,
} = require('../controller/category');

const {
  getBlogPosts,
  getBlogPostById,
  postBlogPost,
  putBlogPost,
} = require('../controller/blogPost');

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
const putValid = [isPostValid, isTokenValid];

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
// routes.get('/post/:id', isTokenValid, getBlogPostById);
// routes.put('/post/:id', putValid, putBlogPost);

module.exports = routes;
