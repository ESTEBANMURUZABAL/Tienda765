'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Product = mongoose.model('Product'),
	_ = require('lodash');

/**
 * Create a Product
 */
exports.create = function(req, res) {
	var product = new Product(req.body);

	product.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}else {
			return res.status(201).json(product);
		}
	});
};

/**
 * Show the current Category
 */
exports.read = function(req, res) {
	res.json(req.category);
};

/**
 * Update a Product
 */
exports.update = function(req, res) {
	var product = req.product;

	product = _.extend(product, req.body);

	product.save(function(err) {
		if(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}else {
			return res.json(product);
		}
	});
};

/**
 * Delete an Product
 */
exports.delete = function(req, res) {
	var product = req.product;

	product.delete(function(err){
		if(err){
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}else {
			return res.json(product);
		}
	});
};

/**
 * List of Products
 */
exports.list = function(req, res) {
	Product.find().exec(function(err, products){
		if(err){
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}else {
			return res.json(products);
		}
	});
};

/**
 * Product middleware
 */
exports.productByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Product is invalid'
		});
	}

	Product.findById(id).exec(function (err, product) {
		if (err) return next(err);
		if (!product) {
			return res.status(404).send({
				message: 'Product not found'
			});
		}
		req.product = product;
		next();
	});
};
