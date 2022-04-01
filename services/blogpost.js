const { BlogPost } = require('../models');

const { getUserIdByEmailService } = require('./user');

// const getBlogPostsService = async () => {
//   const blogPosts = await BlogPost.findAll({
//     include: [{ 
//       model: User,
//       as: 'user', 
//       attributes: { exclude: ['password'] } },
//     { model: Category,
//       as: 'categories',
//       through: { attributes: [] },        
//     }],
//   });    
//   return blogPosts;
// };

// const getBlogPostByIdService = async (req, res) => {
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

const postBlogPostService = async (object) => {
  const { id, title, content, categoryIds } = object;
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

module.exports = {
  // getBlogPostsService,
  // getBlogPostByIdService,
  postBlogPostService,
  // putBlogPost,
};
