const { Category } = require('../models');

const getCategoriesService = async () => {
    const categories = await Category.findAll();
    return categories;
};

const getPostByCategoryService = async (id) => {
    const find = await Category.findOne({ where: { id }, raw: true });
    return find; 
};

const postCategoryService = async (name) => {
  const post = await Category.create({ name });    
  return post;
};

module.exports = {
  getCategoriesService,
  getPostByCategoryService,
  postCategoryService,
};
