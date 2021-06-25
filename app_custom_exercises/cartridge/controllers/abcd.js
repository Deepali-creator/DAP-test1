'use strict';

var server = require('server');

server.get('Show', function (req, res, next) {

	res.render('abcd/defaultpage');
    next();
	 
});

module.exports = server.exports();