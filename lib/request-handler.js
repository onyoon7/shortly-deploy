var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');
var db = require('../app/config');
var Link = require('../app/models/link');
var User = require('../app/models/user');
var app = require('../server-config');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Links.reset().fetch().then(function(links) {
    res.send(200, links.models);
  })
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }


  Link.find({url : uri}, function(result) {
    console.log('Link find result : ', result);
    if(result) { 
      res.send(200, result);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if(err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }
        new Link({
          url : uri,
          title : title,
          baseUrl : req.headers.origin
        })
        .save(function(err, newLink){
          if(err) return console.error(err);
          console.log('newLink value', newLink);
          newLink.code = true;
          res.send(200,newLink)
        });
      })
    }
  })
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.find({username : username, password : password}, function(err,user) {
  console.log('user login result : ',user);
    if(user) { 
      console.log('passed in', user[0]);
      util.createSession(req, res, user[0]);
      console.log('passed in2');
      // res.redirect('/');
    } else {
      res.redirect('/login');
    }
  })
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.find({username : username}, function(err,result) {
    console.log('user result : ',result);
    if(!result) { 
      res.send(302, result[0]);
    } else {
      new User({username: username, password:password}).save(function(err, user){
        // console.log('user of User : ',user);
        if(err) return console.error('error for signupUser',err);
        util.createSession(req, res, user);
        res.redirect('/');
      })
    }
  })
};


exports.navToLink = function(req, res) {
  Link.find({code: req.params[0]}, function(err, link){
    if(!link.length){
      res.redirect('/');
    } else {
      Link.update({code: req.params[0]}, {visits : link.visits+1}, function(err,raw){
        if(err) return console.error(err);
        console.log('The raw response from Mongo was ', raw);
        return res.redirect(link.url);
      });
    }
  });
};
