const { User } = require('../models');
// const jwtToken = require('../utils/jwt');

// const getAll = async (_req, res) => {
//   try {
//     const user = await User.findAll();
//     console.log('BLA: ', user);

//     return res.status(254).json(user);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: 'Ocorreu um erro' });
//   }
// };

const getUsers = async (_req, res) => {
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
};

const getUserByEmail = async (request, res) => {
  try {
    const { email } = request;
    const user = await User.findOne({ where: { email } });
    if (!user) return true;
    return false;
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

const post = async (req, res) => {
  const msg = { message: 'User already registered' };
  try {
    const isThereAnyEmail = await getUserByEmail(req.body);
    if (!isThereAnyEmail) return res.status(409).json(msg);
    const { displayName, email, password, image } = req.body;
    const user = await User.create({ displayName, email, password, image });    

    return res.status(201).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json(msg);
  }
};

module.exports = {
  getUsers,
  getUserByEmail,
  post,
};