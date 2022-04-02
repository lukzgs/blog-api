const { PostCategory } = require('../models');

const postPostCategoryService = async (postId, categoryId) => {
  const post = await PostCategory.create({ postId, categoryId });    
  return post;
};

// extra
const deletePostCategoryService = async (id) => {
  const deletedPost = await PostCategory.destroy({ where: { postId: id } });    
  return deletedPost;
};

module.exports = {
  postPostCategoryService,
  deletePostCategoryService,
};