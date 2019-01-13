/*  
Author: David Rider
Class: CS 340
Date: Nov. 8, 2018
Citation: https://github.com/knightsamar/CS340-Sample-Web-App/blob/master/main.js
*/
module.exports = function(){
    var express = require('express');
    var router = express.Router();
    //******************** STUDENT PAGE ********************//
    //**** STUDENT LIST ****//
    function getStudents(res, mysql, context, complete){
        var sql = "SELECT `id`, `s_name`, `dob`, `s_level`, `s_group` FROM student";
        mysql.pool.query(sql, function(error, result, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.student = result;
            complete();
        });
    }
    function getStudent(res, mysql, context, id, complete) {
        var sql = "SELECT `id`, `s_name`, `dob`, `s_level`, `s_group` FROM student WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(err, results, fields) {
            if (err) {
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }
            context.student = results[0];
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletestudent.js"];
        var mysql = req.app.get('mysql');
        getStudents(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('student', context);
            }
        }
    });
    //**** UPDATE STUDENT****//
    router.get('/:id', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatestudent.js"];
        var mysql = req.app.get('mysql');
        getStudent(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('update-student', context);
            }
        }
    });
    //**** ADD STUDENT AND REDIRECT ****//
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO student (`s_name`, `dob`, `s_level`, `s_group`) VALUES (?,?,?,?)";
        var inserts = [req.body.s_name, req.body.dob, req.body.s_level, req.body.s_group];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/student');
            }
        });
    });
    //**** DELETE STUDENT ****//
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM student WHERE id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    });
    //**** UPDATE STUDENT ****//
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE student SET s_name=?, s_level=?, s_group=?, dob=? WHERE id=?";
        var inserts = [req.body.s_name, req.body.s_level, req.body.s_group, req.body.dob, req.params.id];
        sql = mysql.pool.query(sql,inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                console.log("Student NOT Updated");
                res.end();
            }else{
                res.status(200);
                res.end();
                console.log("Student Updated");
            }
        });
    });
    //**** SEARCH STUDENT ****//
    router.get('/:id', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchstudent.js"];
        var mysql = req.app.get('mysql');
        getStudent(res, mysql, context, req.params.id, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('search-student', context);
            }
        }
    });
    return router;
}();