const isPasswordValid = async (req, res, next) => {
  const msg = [
    { message: '"password" is required' },
    { message: '"password" is not allowed to be empty' },
    { message: '"password" length must be 6 characters long' },   
  ];
  try {
    const { password } = req.body;
    if (password === undefined) return res.status(400).json(msg[0]);
    if (password === '') return res.status(400).json(msg[1]);
    if (password.length !== 6) return res.status(400).json(msg[2]);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const isEmailValid = async (req, res, next) => {
  const msg = [
    { message: '"email" is required' },
    { message: '"email" is not allowed to be empty' },
    { message: '"email" must be a valid email' }, 
  ];
  try {
    const { email } = req.body;
    const regexEmail = /\S+@\S+\.\S+/;
    const checkedEmail = regexEmail.test(email);
    if (email === undefined) return res.status(400).json(msg[0]);
    if (email === '') return res.status(400).json(msg[1]);
    if (!checkedEmail) return res.status(400).json(msg[2]);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const isNameValid = async (req, res, next) => {
  const msg = { message: '"displayName" length must be at least 8 characters long' };

  try {
    const { displayName } = req.body;
    if (typeof displayName !== 'string' || displayName.length < 8) {
      return res.status(400).json(msg);
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const isTokenValid = async (req, res, next) => {
  const msg = [
    { message: 'Token not found' },
    { message: 'Expired or invalid token' },
];
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json(msg[0]);

    const splitToken = authorization.split('.');
    if (splitToken.length !== 3) return res.status(401).json(msg[1]);

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  isNameValid,
  isEmailValid,
  isPasswordValid,
  isTokenValid,
 };