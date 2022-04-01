const { BlogPost } = require('../models');
const { User } = require('../models');
const { Category } = require('../models');

const { getToken, signIn } = require('../utils/token');

const { 
  getBlogPostsService,
 } = require('../services/blogpost');

const { 
  getBlogPostByIdService,
  postBlogPostService,  
} = require('../services/blogpost');

const { 
  getUserIdByEmailService,
  
} = require('../services/user');

const getBlogPosts = async (req, res) => {
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
    const object = { id, title, content, categoryIds };
    const blogPost = await postBlogPostService(object);
    const { id: postId } = blogPost;
    const returning = { id: postId, userId: id, title, content };
    return res.status(201).json(returning);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no postPost' });
  }
};

// eslint-disable-next-line max-lines-per-function
// const putBlogPost = async (req, res) => {
//   const msg = { message: 'Unauthorized user' };
//   const msgCode = { message: 'Unauthorized user', code: 404 };
//   try {
//     const getEmail = getToken(req.headers);
//     const { email } = getEmail;
//     const user = await getUserIdByEmailService(email);
//     const { user } = req.params;

//     // return jsonReturn(msgCode, res);

//     const post = await getBlogPostById(req);
//     console.log('post :', post);

    // if (user.id !== post.user.id) return res.status(401).json(msg);

//     const { title, content } = req.body;
//     const update = await BlogPost.update(
//       { title, content }, 
//       { where: { id } },
// ); 
    // console.log('post: ', post);
    // const result = await getBlogPostById();
    // console.log('result: ', result);

//     return res.status(200).json(user);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: 'Algo deu errado no putPost' });
//   }
// };

module.exports = {
  getBlogPosts,
  getBlogPostById,
  postBlogPost,
  // putBlogPost,
};
