const { User } = require('../models');

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

const getUsers = async (req, res) => {
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

const post = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const user = await User.create({ displayName, email, password, image });
    return res.status(201).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro no post' });
  }
};

module.exports = {
  getUsers,
  post,
};