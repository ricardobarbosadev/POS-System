const { Router } = require('express');
const loginRoutes = require('./login.routes');
const userRoutes = require('./user.routes');
const categoryRoutes = require('./category.routes');
const productRoutes = require('./product.routes');
const clientRoutes = require('./client.routes');
const orderRoutes = require('./order.routes');

const routes = Router();

routes.use('/usuario', userRoutes);
routes.use('/categoria', categoryRoutes);
routes.use('/login', loginRoutes);
routes.use('/cliente', clientRoutes);
routes.use('/produto', productRoutes);
routes.use('/pedido', orderRoutes);

module.exports = routes;
