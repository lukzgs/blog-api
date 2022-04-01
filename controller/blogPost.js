const { BlogPost } = require('../models');
const { User } = require('../models');
const { Category } = require('../models');

const { getToken, signIn } = require('../utils/token');

const { 
  // getBlogPostByIdService,
  postBlogPostService,  
} = require('../services/blogpost');

const { 
  getUserIdByEmailService,
  
} = require('../services/user');

const getBlogPosts = async (req, res) => {
  try {
    signIn(req.headers);
    const blogPosts = await BlogPost.findAll({
      include: [{ 
        model: User,
        as: 'user', 
        attributes: { exclude: ['password'] } },
      { model: Category,
        as: 'categories',
        through: { attributes: [] },        
      }],
    });    
    return res.status(200).json(blogPosts);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getUsers' });
  }
};

// const getBlogPostById = async (req, res) => {
//   const msg = { message: 'Post does not exist' };
//   try {
//     console.log(req.params);
//     const { id } = req.params;
//     const find = await BlogPost.findOne({       
//       include: [{ model: User, as: 'user', attributes: { exclude: ['password'] }, where: { id } }, 
//         { model: Category, as: 'categories', through: { attributes: [] },        
//       }],
//     });
//     if (!find) return res.status(404).json(msg);
//     return res.status(200).json(find);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: 'Algo deu errado no blogPost' });
//   }
// };

const postBlogPost = async (req, res) => {
  try {
    const getEmail = getToken(req.headers);
    const { email } = getEmail;
    const user = await getUserIdByEmailService(email);
    console.log(user);
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
//     const token = getToken(req.headers);
//     console.log('token :', token);

//     const user = await getUserIdByEmail(token);
//     console.log('user: ', user);
//     console.log('userid: ', user.id);

//     const { id } = req.params;
//     console.log('params: ', req.params);
//     console.log('id: ', id);
//     // return jsonReturn(msgCode, res);

//     const post = await getBlogPostById(req);
//     console.log('post :', post);

//     // if (user.id !== post.user.id) return res.status(401).json(msg);

// //     const { title, content } = req.body;
// //     const update = await BlogPost.update(
// //       { title, content }, 
// //       { where: { id } },
// // ); 
//     // console.log('post: ', post);
//     // const result = await getBlogPostById();
//     // console.log('result: ', result);

//     return res.status(200).json(user);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: 'Algo deu errado no putPost' });
//   }
// };

module.exports = {
  getBlogPosts,
  // getBlogPostById,
  postBlogPost,
  // putBlogPost,
};
