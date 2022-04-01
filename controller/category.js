const { Category } = require('../models');

const { 
  getCategoriesServices,
  getPostByCategoryServices,
  postCategoryServices,
 } = require('../services/category');

const getCategories = async (_req, res) => {
  try {
    const categories = await getCategoriesServices();    
    return res.status(200).json(categories);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getCategories' });
  }
};

const getPostByCategory = async (req, res) => {
  try {
    const find = await getPostByCategoryServices(req, res);
    return find;
  } catch (e) {
  console.log(e.message);
  res.status(500).json({ message: 'Algo deu errado no getUserById' });
  }
};

const postCategory = async (req, res) => {
  try {
    const post = await postCategoryServices(req.body);    
    return res.status(201).json(post);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no postCategory' });
  }
};

module.exports = {
  getCategories,
  getPostByCategory,
  postCategory,
};