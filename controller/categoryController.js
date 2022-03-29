const { Category } = require('../models');

const getCategories = async (_req, res) => {
  try {
    const categories = await Category.findAll();    
    return res.status(200).json(categories);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getCategories' });
  }
};

const getPostByCategory = async (id, res) => {
  try {
    const find = await Category.findOne({ where: { id } });
    return find;
  } catch (e) {
  console.log(e.message);
  res.status(500).json({ message: 'Algo deu errado no getUserById' });
  }
};

const postCategory = async (req, res) => {
  try {
    const post = await Category.create(req.body);    
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