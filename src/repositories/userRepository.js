const knex = require('../database/connection');

const findByEmail = async (email) => {
    return await knex('users').where('email', email).first();
}

const insertUser = async (nome, email, senha) => {
    return await knex('users').insert({nome, email, senha}).returning(['id', 'nome', 'email']);
}

const updateUser = async (id, nome, email, senha) => {
    return await knex('users').where('id', id).update({nome, email, senha}).returning(['id', 'nome', 'email']);
}

const getUserById = async (id) => {
    return await knex('users').where('id', id).first();
}

module.exports = {
  findByEmail,
  insertUser,
  updateUser,
  getUserById
}
