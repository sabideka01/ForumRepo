var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var BoardModel = require('../models/BoardModel.js');

router.get('/', function(req, res, next) {
  BoardModel.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

module.exports = router;