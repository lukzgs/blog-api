const { User } = require('../models');

const getUsersService = async () => {
  const users = await User.findAll({ 
    attributes: { exclude: ['password'] } },
    { raw: true });
  return users;  
};

const getUserByIdService = async (id) => {
  const find = await User.findOne({ 
    attributes: { exclude: ['password'] },
    where: { id },
    raw: true });
    console.log(find);
  return find;
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
  postUserService,
  // deleteUser,
};