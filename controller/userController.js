const { User } = require('../models');

const getAll = async (_req, res) => {
  try {
    const user = await User.findAll();

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const post = async (req, res) => {
  try {
    const { id, displayName, email, password, image } = req.body;
    const user = await User.create({ id, displayName, email, password, image });
    return res.status(201).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

module.exports = {
  getAll,
  post };