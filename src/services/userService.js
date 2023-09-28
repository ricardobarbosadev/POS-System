const bcrypt = require('bcrypt');
const { findByEmail, insertUser, updateUser } = require('../repositories/userRepository');
const AppError = require('../errors/AppError');

const executeCreate = async (nome, email, senha) => {
    const checkEmailExists = await findByEmail(email);
    if(checkEmailExists) {
        throw new AppError("Email already exists.", 400);
    }
    const encryptPassword = await bcrypt.hash(senha, 10);
    const userCreated = await insertUser(nome, email, encryptPassword);
    return userCreated[0];
}

const executeUpdate = async (nome, email, senha) => {
  /* const checkEmailExists = await findByEmail(email);
  if(checkEmailExists) {
    throw new AppError("Email already exists.", 400);
  } */

  const userUpdated = await updateUser(nome, email, senha);
}

module.exports = {
  executeCreate,
  executeUpdate
}
