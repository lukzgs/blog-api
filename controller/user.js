const { User } = require('../models');
const { getToken } = require('../utils/token');

const { getUsersService } = require('../services/user');

const getUsers = async (req, res) => {
  try {
    const users = await getUsersService();
    console.log(users);
    return res.status(200).json(users);

    // const users = await User.findAll();
    // const user = users.map((u) => {
    //   const object = {
    //     id: u.id,
    //     displayName: u.displayName,
    //     email: u.email,
    //     image: u.image,
    //   };
    //   return object;
    // });
    // return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getUsersControl' });
  }
};

const getUserById = async (req, res) => {
  const msg = { message: 'User does not exist' };
  try {
    const { id: user } = req.params;
    const find = await User.findOne({ where: { id: user } });
    if (!find) return res.status(404).json(msg);
    const { id, displayName, email, image } = find;
    const object = {
      id,
      displayName,
      email,
      image,
    };

    return res.status(200).json(object);
  } catch (e) {
  console.log(e.message);
  res.status(500).json({ message: 'Algo deu errado no getUserById' });
  }
};

const getUserByEmail = async (request, res) => {
  try {
    const { email } = request;
    const user = await User.findOne({ where: { email } });
    if (!user) return true;
    return false;
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getUserByEmail' });
  }
};

const getUserIdByEmail = async (request, res) => {
  try {
    const { email } = request;
    const user = await User.findOne({ where: { email }, raw: true });
    return user;
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getUserByEmail' });
  }
};

const postUser = async (req, res) => {
  const msg = { message: 'User already registered' };
  try {
    const isThereAnyEmail = await getUserByEmail(req.body);
    if (!isThereAnyEmail) return res.status(409).json(msg);
    const { displayName, email, password, image } = req.body;
    const user = await User.create({ displayName, email, password, image });    

    return res.status(201).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no postUser' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const token = getToken(req.headers);
    const user = await getUserIdByEmail(token);
    // deleta primeiro o delete do blogs
    const deletedUSer = await User.destroy({ where: { id: user.id } });
    // AINDA FALTA DELETAR O BLOG TB, POR ISSO NÃO PASSA NO TESTE
    // const deleteBlogPost = await BlogPost.destroy({ where: { id: user.id } });
    /* Cannot delete or update a parent row: a foreign key constraint fails (`blogs_api`.`BlogPosts`, CONSTRAINT `BlogPosts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)) */
    console.log('deleteUser: ', deletedUSer);
    return res.status(204).json();
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no deleteUser' });
  }
};

module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  getUserIdByEmail,
  postUser,
  deleteUser,
};