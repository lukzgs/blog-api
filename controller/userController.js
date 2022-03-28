const { User } = require('../models');
const { Category } = require('../models');

const getUsers = async (_req, res) => {
  try {
    const users = await User.findAll();
    const user = users.map((u) => {
      const object = {
        id: u.id,
        displayName: u.displayName,
        email: u.email,
        image: u.image,
      };
      return object;
    });
    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getUsers' });
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
  getUsers,
  getUserByEmail,
  getUserById,
  postUser,
  postCategory,
};