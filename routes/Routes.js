const express = require('express');

const routes = express.Router();

const { getAll, post } = require('../controller/userController');

routes.get('/', getAll);
// routes.get('/:id',) ;
routes.post('/', post);
// routes.put('/:id', );
// routes.delete('/:id', );

module.exports = routes;
