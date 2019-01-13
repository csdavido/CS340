/*  
Author: David Rider
Class: CS 340
Date: Nov. 8, 2018
Citation: https://github.com/knightsamar/CS340-Sample-Web-App/blob/master/main.js
*/
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_riderda',
  password        : 'sUT9Wl3gPUAfsYQF',
  database        : 'cs340_riderda'
});
module.exports.pool = pool;