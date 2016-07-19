var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var UserModel = require('../models/UserModel.js');

router.get('/', function (req, res, next) {
  UserModel.find(function (err, docs) {
  	if (err) return next(err);
    console.log(docs);
    res.json(docs);
  });
});

router.post('/', function (req, res, next) {
  var newUser = new UserModel({
	  name: req.body.name,
	  username: req.body.username,
	  password: req.body.password,
	  role:'user',
	  email:req.body.email 
	});
  newUser.save(function(err, doc) {
  	if (err) return next(err);
    res.json(doc);
  });
});

router.delete('/:id', function (req, res, next) {
	var id = req.params.id;
	UserModel.findByIdAndRemove(id, function(err, doc) {
	  if (err) throw err;
	  console.log('User deleted!');
	  res.json(doc);
	});
});

router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  UserModel.findOne(id, function (err, doc) {
  	if (err) return next(err);
    res.json(doc);
  });
});

router.put('/:id', function (req, res, next) {
  var id = req.params.id;
  UserModel.findByIdAndUpdate(id, 
  	{ 
  		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		role:'user',
		email:req.body.email 
	 }, 
  	function(err, doc){
  		if (err) return next(err);
    	res.json(doc);
  	}
  );
});

module.exports = router;

