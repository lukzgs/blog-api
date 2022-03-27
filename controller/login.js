const jwt = require('../utils/jwt');
const { User } = require('../models');

const login = async (req, res, next) => {
  const msg = { message: 'Invalid fields' };
  try {
    const { email } = req.body;
    const users = await User.findAll();
    console.log('loginUser : ', users);

    const isEmailThere = users.some((element) => element.email === email);
    if (!isEmailThere) return res.status(400).json(msg);
    
    const token = jwt({ email });
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  login,
};