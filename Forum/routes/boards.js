var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var BoardModel = require('../models/BoardModel.js');
var UserModel = require('../models/UserModel.js');

router.get('/', function(req, res, next) {
  BoardModel.find(function (err, boards) {
    if (err) return next(err);
    res.json(boards);
  });
});

router.get('/:boardId', function(req, res, next) {
  var boardId = req.params.boardId;
  BoardModel.findById(boardId, function (err, board) {
    if (err) return next(err);
      if(board==undefined || board==null) {
    	res.json("Could not find board");
      }else{
      	res.json(board);
      }
  });
});

router.post('/:userId', function(req, res, next) {
  var userId = req.params.userId;
  var board = new BoardModel({
  	title: req.body.title,
  	isPublic: req.body.isPublic,
  	allowedPosts: 100
  });
  UserModel.findOne(userId, function (err, user) {
  	if (err) return next(err);
    if(user==undefined || user==null) {
    	res.json({"error":"could not find user"});
    }else{
    	user.boards.push(board);
    	user.save(function(err, doc) {
		  	if (err) return next(err);
		    board.user = user;
	    	board.save(function(err, doc) {
			  	if (err) return next(err);
			    res.json(doc);
  			});
  		});
    }   
  });  
});

router.put('/:boardId', function (req, res, next) {
  var boardId = req.params.boardId;
  BoardModel.findByIdAndUpdate(boardId, 
  	{ 
  		title: req.body.title,
  		isPublic: req.body.isPublic,
  		allowedPosts: 100
	 }, 
  	function(err, board){
  		if (err) return next(err);
    	res.json(board);
  	}
  );
});

router.delete('/:boardId', function (req, res, next) {
	var boardId = req.params.boardId;
	BoardModel.findByIdAndRemove(boardId, function(err, board) {
	  if (err) throw err;
	  console.log('User deleted!');
	  res.json(board);
	});
});

module.exports = router;