const express = require('express');
const router = express.Router();
const searchController = require('../controllers/SearchController');
const searchMiddleware = require('../middlewares/parseQueryFilter');



router.route('/search').get(searchMiddleware.ParseQueryString, searchController.findCreches)
module.exports = router;