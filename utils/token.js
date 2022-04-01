const jwt = require('jsonwebtoken');

const getToken = (header, res) => {
  try {
    const { authorization } = header;
    // postman
    // const tokenAuth = authorization.split(' ')[1];    
    // console.log('tokenAuth : ', tokenAuth);
    // const decoder = jwt.verify(tokenAuth, process.env.JWT_SECRET);
    const decoder = jwt.verify(authorization, process.env.JWT_SECRET);
    const { token } = decoder;
    return token;
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getToken' });
  }
};

const signIn = (header, res) => {
  try {
    const { authorization } = header;
    // postman
    // const tokenAuth = authorization.split(' ')[1];    
    // console.log('tokenAuth : ', tokenAuth);
    // const decoder = jwt.verify(tokenAuth, process.env.JWT_SECRET);
    const decoder = jwt.sign(authorization, process.env.JWT_SECRET);
    return decoder;
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getToken' });
  }
};

module.exports = {
  getToken,
  signIn,
};