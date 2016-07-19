var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var PostModel = require('../models/PostModel.js');

router.get('/', function(req, res, next) {
  PostModel.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

module.exports = router;