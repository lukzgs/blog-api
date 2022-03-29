const { getPostByCategory } = require('../controller/categoryController');

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

const isDisplayNameValid = async (req, res, next) => {
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

const isNameValid = async (req, res, next) => {
  const msg = { message: '"name" is required' };
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json(msg);
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

const isPostValid = async (req, res, next) => {
  const msg = [
    { message: '"title" is required' },
    { message: '"content" is required' },
];
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json(msg[0]);
    const { content } = req.body;
    if (!content) return res.status(400).json(msg[1]);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// eslint-disable-next-line max-lines-per-function
const isCategoryId = async (req, res, next) => {
  const msg = [{ message: '"categoryIds" is required' },
    { message: '"categoryIds" not found' },
];
  try {
    const { categoryIds } = req.body;
    if (!categoryIds) return res.status(400).json(msg[0]);
    const categoryExistance = categoryIds.map(async (id) => {
      const getCategory = await getPostByCategory(id);
      return getCategory;
    });
    const promiseAll = await Promise.all(categoryExistance).then();
    const badCase = promiseAll.filter((e) => e === null);
    if (badCase.length !== 0) return res.status(400).json(msg[1]);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// eslint-disable-next-line max-lines-per-function
// const postBlogPost = async (req, res) => {
//   try {
//     const { authorization } = req.headers;    
//     const tokenAuth = authorization.split(' ')[1];
//     const decoder = jwt.verify(tokenAuth, process.env.JWT_SECRET);
//     const { token } = decoder;
//     console.log('token: ', token);
//     const user = await getUserIdByEmail(token);
//     console.log('user: ', user);

//     const { title, content, categoryIds } = req.body;
//     const post = await BlogPost.create({
//       title,
//       content,
//       userId: user.id,
//       categoryIds,
//       published: new Date(),
//       updated: new Date(),
//     });
    
//     return res.status(201).json(post);
//   } catch (e) {
//     console.log(e.message);
//     res.status(500).json({ message: 'Algo deu errado no postPost' });
//   }
// };

module.exports = {
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
  isTokenValid,
  isNameValid,
  isPostValid,
  isCategoryId,
 };