const { Category } = require('../models');

const getCategoriesServices = async () => {
    const categories = await Category.findAll();
    return categories;
};

const getPostByCategoryServices = async (id) => {
    const find = await Category.findOne({ where: { id } });    
    return find; 
};

const postCategoryServices = async (name) => {
  const post = await Category.create({ name });    
  return post;
};

module.exports = {
  getCategoriesServices,
  getPostByCategoryServices,
  postCategoryServices,
};