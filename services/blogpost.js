const { BlogPost } = require('../models');
const { User } = require('../models');
const { Category } = require('../models');

// const { getUserIdByEmailService } = require('./user');

const getBlogPostsService = async () => {
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
  return blogPosts;
};

const getBlogPostByIdService = async (id) => {
  const find = await BlogPost.findOne({       
    include: [{ 
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
      where: { id },
    }, 
      { model:
        Category,
        as: 'categories',
        through: { attributes: [] },        
    }],
  });
  return find;  
};

const postBlogPostService = async ({ id, title, content, categoryIds }) => {
  // const { id, title, content, categoryIds } = object;
  const post = await BlogPost.create({
    title,
    content,
    userId: id,
    categoryIds,
    published: new Date(),
    updated: new Date(),
  });
  return post;  
};

// const putBlogPost = async () => {
//   const { title, content } = req.body;
//   const update = await BlogPost.update(
//     { title, content }, 
//     { where: { id } },
// ); 
//   return update;
// };

module.exports = {
  getBlogPostsService,
  getBlogPostByIdService,
  postBlogPostService,
  // putBlogPost,
};
