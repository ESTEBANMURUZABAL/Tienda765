
    'use strict';

    module.exports = function(app) {
        var categories = require('../../app/controllers/categories.server.controller');
        var users = require('../controllers/users.server.controller');
        var apiAuth = require('../controllers/api.authorization.server.controller');

        app.route('/categories')
            .get(apiAuth, users.requiresLogin, categories.list)
            .post(apiAuth, users.requiresLogin, categories.create);

        app.route('/categories/:categoryId')
            .get(apiAuth, users.requiresLogin, categories.read)
            .put( apiAuth, users.requiresLogin, categories.update)
            .delete( apiAuth, users.requiresLogin, categories.delete);

        // Finish by binding the article middleware
        // What's this? Where the categoryId is present in the URL
        // the logic to 'get by id' is handled by this single function
        // and added to the request object i.e. request.category.
        app.param('categoryId', categories.categoryByID);
    };
