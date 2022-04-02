const { PostCategory } = require('../models');

const postPostCategoryService = async (postId, categoryId) => {
  const post = await PostCategory.create({ postId, categoryId });    
  return post;
};

const deletePostCategoryService = async (id) => {
  console.log('recebeu: ', id);
  const deletedPost = await PostCategory.destroy({ where: { postId: id } });    
  return deletedPost;
};

module.exports = {
  postPostCategoryService,
  deletePostCategoryService,
};