module.exports = function(){
    var express = require('express');
    var router = express.Router();
    //******************** SUBJECT PAGE ********************//
    //**** SUBJECT LIST ****//
    function getSubject(res, mysql, context, complete){
        var sql = "SELECT `subject_code`, `subject_name`, `room_number`, `subject_teacher` FROM subject";
        mysql.pool.query(sql, function(error, result, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.subject = result;
            complete();
        });
    }
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletesubject.js"];
        var mysql = req.app.get('mysql');
        getSubject(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('subject', context);
            }
        }
    });
    //**** ADD SUBJECT AND REDIRECT ****//
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO subject (`subject_name`, `room_number`, `subject_teacher`) VALUES (?,?,?)";
        var inserts = [req.body.subject_name, req.body.room_number, req.body.subject_teacher];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/subject');
            }
        });
    });
    //**** DELETE SUBJECT ****//
    router.delete('/:subject_code', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM subject WHERE subject_code = ?";
        var inserts = [req.params.subject_code];
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
    return router;
}();