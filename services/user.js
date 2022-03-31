const { User } = require('../models');
const { getToken } = require('../utils/token');

const getUsersService = async (_req, res) => {
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
    return user;
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getUsersService' });
  }
};

module.exports = {
  getUsersService,
  // getUserByEmail,
  // getUserById,
  // getUserIdByEmail,
  // postUser,
  // deleteUser,
};