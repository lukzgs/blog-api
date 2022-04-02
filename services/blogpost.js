const { BlogPost } = require('../models');
const { User } = require('../models');
const { Category } = require('../models');

const getBlogPostsService = async () => {
  const blogPosts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] }
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  return blogPosts;
};

const getBlogPostByIdService = async (id) => {
  const find = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model:
        Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  return find;
};

const postBlogPostService = async (object) => {
  const { id, title, content } = object;
  const post = await BlogPost.create({
    title,
    content,
    userId: id,
    published: new Date(),
    updated: new Date(),
  });
  return post;
};

const putBlogPostService = async ({ id, title, content }) => {
  const update = await BlogPost.update(
    { title, content },
    { where: { id } },
  );
  console.log('putBlogPost ', update);
  return update;
};

module.exports = {
  getBlogPostsService,
  getBlogPostByIdService,
  postBlogPostService,
  putBlogPostService,
};
