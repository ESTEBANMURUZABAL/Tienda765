'use strict';

module.exports = function(app) {
	var products = require('../../app/controllers/products.server.controller');
	var users = require('../../app/controllers/users.server.controller');
	var apiAuth = require('../controllers/api.authorization.server.controller');

	app.route('/products')
		.get(apiAuth, users.requiresLogin, products.list)
		.post(apiAuth, users.requiresLogin, products.create);

	app.route('/products/:productsId')
		.get(apiAuth, users.requiresLogin, products.read)
		.put(apiAuth, users.requiresLogin, products.update)
		.delete(apiAuth, users.requiresLogin, products.delete);

	// Finish by binding the article middleware
	// What's this? Where the categoryId is present in the URL
	// the logic to 'get by id' is handled by this single function
	// and added to the request object i.e. request.category.
	app.param('productsId', products.productByID);
};
