/*  
Author: David Rider
Class: CS 340
Date: Nov. 8, 2018
Citation: https://github.com/knightsamar/CS340-Sample-Web-App/blob/master/main.js
*/
var express = require('express');
var mysql = require('./dbcon.js');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(bodyParser.urlencoded({extended:true}));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');

app.set('port', process.argv[2]);
app.set('mysql', mysql);


app.use('/student', require('./student.js'));
app.use('/class_enrollment', require('./class_enrollment.js'));
app.use('/class', require('./class.js'));
app.use('/room', require('./room.js'));
app.use('/class_rooms', require('./class_rooms.js'));
app.use('/subject_rooms', require('./subject_rooms.js'));
app.use('/subject', require('./subject.js'));
app.use('/subject_enrollment', require('./subject_enrollment.js'));


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on port:' + app.get('port') + '; press Ctrl-C to terminate.');
});