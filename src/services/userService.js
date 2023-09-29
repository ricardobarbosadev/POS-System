const bcrypt = require('bcrypt');
const {
  findByEmail,
  insertUser,
  updateUser,
  getUserById,
} = require('../repositories/userRepository');
const AppError = require('../errors/AppError');

const executeCreate = async (nome, email, senha) => {
  const checkEmailExists = await findByEmail(email);
  if (checkEmailExists) {
    throw new AppError('Email already exists.', 400);
  }
  const encryptPassword = await bcrypt.hash(senha, 10);
  const userCreated = await insertUser(nome, email, encryptPassword);
  return userCreated[0];
};

const executeUpdate = async (id, nome, email, senha) => {
  const userExists = await getUserById(id);
  const checkEmailExists = await findByEmail(email);

  if (checkEmailExists && checkEmailExists.id !== userExists.id) {
    throw new AppError('Email already exists.', 400);
  }

  const encryptPassword = await bcrypt.hash(senha, 10);

  const userUpdated = await updateUser(id, nome, email, encryptPassword);
};

module.exports = {
  executeCreate,
  executeUpdate,
};
