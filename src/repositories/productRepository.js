const knex = require('../database/connection');

const findAll = async () => {
  return await knex('products').orderBy('id');
};

const findByCategory = async (categoria_id) => {
  return await knex('products').where('categoria_id', categoria_id).orderBy('id');
};

const findById = async (id) => {
  return await knex('products').where('id', id).first();
};

const insert = async (descricao, quantidade_estoque, valor, categoria_id) => {
  return await knex('products').insert({ descricao, quantidade_estoque, valor, categoria_id }).returning(['id', 'descricao', 'quantidade_estoque', 'valor', 'categoria_id']);
};

const remove = async (id) => {
  return await knex('products').where('id', id).del();
};

const update = async (id, descricao, quantidade_estoque, valor, categoria_id) => {
  return await knex('products').where('id', id).update({ descricao, quantidade_estoque, valor, categoria_id });
};

const findByDescription = async (descricao) => {
  return await knex('products').whereILike('descricao', descricao).first();
};

const findByDescriptionAndDifferentId = async (descricao, id) => {
  return await knex('products').whereILike('descricao', descricao).andWhere('id', '!=', id).first();
};

module.exports = { insert, findAll, findById, remove, findByCategory, update, findByDescription, findByDescriptionAndDifferentId };