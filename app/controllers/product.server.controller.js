'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Product = mongoose.model('Product'),
	_ = require('lodash');

var crud = require('./crud.server.controller')('Product','name');

module.export = crud;
