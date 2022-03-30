const jwt = require('jsonwebtoken');

const getToken = (header, res) => {
  try {
    const { authorization } = header;
    console.log('header : ', header);
    // postman
    // const tokenAuth = authorization.split(' ')[1];    
    // console.log('tokenAuth : ', tokenAuth);
    // const decoder = jwt.verify(tokenAuth, process.env.JWT_SECRET);

    const decoder = jwt.verify(authorization, process.env.JWT_SECRET);
    console.log('decoder :', decoder);
    const { token } = decoder;
    console.log('token :', token);

    return token;
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getToken' });
  }
};

module.exports = {
  getToken,
};