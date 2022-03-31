const { BlogPost } = require('../models');
const { User } = require('../models');
const { Category } = require('../models');
// const { PostCategory } = require('../models');

const { getToken, signIn } = require('../utils/token');

const { getUserIdByEmail } = require('./user');

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
    console.log('blogPost :', blogPosts); 
    return res.status(200).json(blogPosts);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getUsers' });
  }
};

const postBlogPost = async (req, res) => {
  try {
    const token = getToken(req.headers);
    const user = await getUserIdByEmail(token);
    const { title, content, categoryIds } = req.body;
    const post = await BlogPost.create({
      title,
      content,
      userId: user.id,
      categoryIds,
      published: new Date(),
      updated: new Date(),
    });
    
    return res.status(201).json(post);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no postPost' });
  }
};

module.exports = {
  getBlogPosts,
  postBlogPost,
};
