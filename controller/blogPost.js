const { getToken } = require('../utils/token');

const { 
  getBlogPostsService,
  putBlogPostService,
 } = require('../services/blogPost');
 
 const { 
  postPostCategory,
 } = require('./postCategory');

const { 
  getBlogPostByIdService,
  postBlogPostService,  
} = require('../services/blogPost');

const { 
  getUserIdByEmailService,  
} = require('../services/user');

const getBlogPosts = async (_req, res) => {
  try {
    const post = await getBlogPostsService();
    return res.status(200).json(post);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getUsers' });
  }
};

const getBlogPostById = async (req, res) => {
  const msg = { message: 'Post does not exist' };
  try {
    const { id } = req.params;
    const user = await getBlogPostByIdService(id);
    if (!user) return res.status(404).json(msg);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no blogPost' });
  }
};

const postBlogPost = async (req, res) => {
  try {
    const getEmail = getToken(req.headers);
    const { email } = getEmail;
    const user = await getUserIdByEmailService(email);
    const { id } = user;
    const { title, content, categoryIds } = req.body;
    const object = { id, title, content };
    const blogPost = await postBlogPostService(object);
    const { id: postId } = blogPost;
    await postPostCategory(postId, categoryIds);
    const returning = { id: postId, userId: id, title, content };
    return res.status(201).json(returning);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no postPost' });
  }
};

const putBlogPost = async (req, res) => {
  const msg = [{ message: 'Unauthorized user' },
  { message: 'Categories cannot be edited' }];
  try {
    const { email } = getToken(req.headers);
    const user = await getUserIdByEmailService(email);
    const { id } = user;
    const { id: postId } = req.params;
    const { user: { id: userId } } = await getBlogPostByIdService(id);
    if (userId !== id) return res.status(401).json(msg[0]);
    const { title, content, categoryIds } = req.body;
    if (categoryIds) return res.status(400).json(msg[1]);
    await putBlogPostService({ title, id: postId, content });
    const updatedPost = await getBlogPostByIdService(postId);
    return res.status(200).json(updatedPost);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no putPost' });
  }
};

module.exports = {
  getBlogPosts,
  getBlogPostById,
  postBlogPost,
  putBlogPost,
};
