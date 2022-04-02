const { PostCategory } = require('../models');

const postPostCategoryService = async (postId, categoryId) => {
  const post = await PostCategory.create({ postId, categoryId });    
  return post;
};
     
module.exports = {
  postPostCategoryService,
};