const { User } = require('../models');
const { getToken } = require('../utils/token');

const { 
  getUsersService,
  getUserByIdService,
  getUserIdByEmailService,
  postUserService,
  deleteUserService,
 } = require('../services/user');

 const { 
  deletePostCategoryService,
 } = require('../services/postCategory');

 const { 
  getBlogPostsByUserIdService,
  deleteBlogPostsService,
 } = require('../services/blogpost');

const getUsers = async (_req, res) => {
  try {
    const users = await getUsersService();
    return res.status(200).json(users);   
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getUsersControl' });
  }
};

const getUserById = async (req, res) => {
  const msg = { message: 'User does not exist' };
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json(msg);
    return res.status(200).json(user);
  } catch (e) {
  console.log(e.message);
  res.status(500).json({ message: 'Algo deu errado no getUserByIdControl' });
  }
};

const postUser = async (req, res) => {
  const msg = { message: 'User already registered' };
  try {
    const { displayName, email, password, image } = req.body;
    const isThereAnyEmail = await getUserIdByEmailService(email);
    if (isThereAnyEmail) return res.status(409).json(msg);
    const object = { displayName, email, password, image };
    const newUser = await postUserService(object);
    return res.status(201).json(newUser);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no postUser' });
  }
};

// eslint-disable-next-line max-lines-per-function
const deleteUser = async (req, res) => {
  try {
    const { email } = getToken(req.headers);
    const { id } = await getUserIdByEmailService(email);
    // console.log(id);
    // // procura por todos os posts de um usuário
    // const getPosts = await getBlogPostsByUserIdService(id);
    // // delete as tabela na tabela PostCategory
    // const mapPostCategories = getPosts.map(async (e) => { 
    //   const deletedCat = await deletePostCategoryService(e.id);
    //   return deletedCat;
    // });
    // // delete as tabela na tabela BlogPost
    // const mapBlogPost = getPosts.map(async (e) => { 
    //   const deletedBlogPost = await deleteBlogPostsService(e.id);
    //   return deletedBlogPost;
    // });
    // delete as tabela na tabela User
    const deletedUser = await deleteUserService(id);
    return res.status(204).json(deletedUser);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no deleteUser' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  deleteUser,
};

// const { categoryIds } = req.body;
// const categoryExistance = categoryIds.map(async (id) => {
//   const getCategory = await getPostByCategoryService(id);
//   return getCategory;
// });
// const promiseAll = await Promise.all(categoryExistance).then();
// const badCase = promiseAll.filter((e) => e === null);
// if (badCase.length !== 0) return res.status(400).json(msg[1]);