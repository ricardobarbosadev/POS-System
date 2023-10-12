const knex = require('../database/connection');

const insert = async (pedido_id, produto_id, quantidade_produto, valor_produto) => {
  return await knex('order_products').insert({ pedido_id, produto_id, quantidade_produto, valor_produto }).returning('*');
};

module.exports = {insert}