const { BlogPost } = require('../models');
const { User } = require('../models');
const { Category } = require('../models');

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

// eslint-disable-next-line max-lines-per-function
const getBlogPostById = async (req, res) => {
  const msg = { message: 'Post does not exist' };
  try {
    const { id } = req.params;
    console.log('id :', id);
    const find = await BlogPost.findOne({       
      include: [{
        model: User,
        as: 'user', 
        attributes: { exclude: ['password'] },
        where: { id },
       },
      { model: Category,
        as: 'categories',
        through: { attributes: [] },        
      }],
    });
    console.log('find :', find);
    if (!find) return res.status(404).json(msg);
    return res.status(200).json(find);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no blogPost' });
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
  getBlogPostById,
  postBlogPost,
};
