const { getToken } = require('../utils/token');

const { 
  getUsersService,
  getUserByIdService,
  getUserIdByEmailService,
  postUserService,
  deleteUserService,
 } = require('../services/user');

const getUsers = async (_req, res) => {
  try {
    const users = await getUsersService();
    return res.status(200).json(users);   
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no getUsersControl' });
  }
};

const getUserById = async (req, res) => {
  const msg = { message: 'User does not exist' };
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).json(msg);
    return res.status(200).json(user);
  } catch (e) {
  console.log(e.message);
  res.status(500).json({ message: 'Algo deu errado no getUserByIdControl' });
  }
};

const postUser = async (req, res) => {
  const msg = { message: 'User already registered' };
  try {
    const { displayName, email, password, image } = req.body;
    const isThereAnyEmail = await getUserIdByEmailService(email);
    if (isThereAnyEmail) return res.status(409).json(msg);
    const object = { displayName, email, password, image };
    const newUser = await postUserService(object);
    return res.status(201).json(newUser);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no postUser' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = getToken(req.headers);
    const { id } = await getUserIdByEmailService(email);
    const deletedUser = await deleteUserService(id);
    return res.status(204).json(deletedUser);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado no deleteUser' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  deleteUser,
};