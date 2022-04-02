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
  return find;
};

const getUserIdByEmailService = async (email) => {
  const user = await User.findOne({ where: { email }, raw: true });
  return user;
};

const postUserService = async ({ displayName, email, password, image }) => {
  const user = await User.create({ displayName, email, password, image });
  return user;
};

const deleteUserService = async (id) => {
  const user = await User.destroy({ where: { id } });
  return user;
};

module.exports = {
  getUsersService,
  getUserIdByEmailService,
  getUserByIdService,
  postUserService,
  deleteUserService,
};