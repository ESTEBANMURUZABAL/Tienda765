'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Category = mongoose.model('Category'),
	_ = require('lodash');

var crud = require('./crud.server.controller')('Product', 'name');

module.exports = crud;
