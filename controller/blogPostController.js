const { User } = require('../models');
const { Category } = require('../models');
const { BlogPost } = require('../models');
const { getToken } = require('../utils/token');

const { getUserIdByEmail } = require('./userController');

const getBlogPosts = async (_req, res) => {
  try {
    const blogPosts = await BlogPost.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      }, {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      }],
      raw: true,
  });
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
