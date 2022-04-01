const { User } = require('../models');

const getUsersService = async (_req, res) => {
  try {
    const users = await User.findAll({ 
      attributes: { exclude: ['password'] } },
      { raw: true });
    return users;
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getUsersService' });
  }
};

const getUserByIdService = async (req, res) => {
  try {
    const { id: user } = req.params;
    const find = await User.findOne({ where: { id: user }, raw: true });
    return find;
  } catch (e) {
  console.log(e.message);
  res.status(500).json({ message: 'Algo deu errado no getUserByIdService' });
  }
};

const getUserIdByEmailService = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email }, raw: true });
    return user;
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getUserIdByEmail' });
  }
};

const postUserService = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const user = await User.create({ displayName, email, password, image });
    return user;
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no postUser' });
  }
};

module.exports = {
  getUsersService,
  getUserIdByEmailService,
  getUserByIdService,
  // getUserIdByEmail,
  postUserService,
  // deleteUser,
};