module.exports = function(){
    var express = require('express');
    var router = express.Router();
    //******************** CLASS PAGE ********************//
    //**** CLASS LIST ****//
    function getClass(res, mysql, context, complete){
        var sql = "SELECT `class_name`, `room_number`, `homeroom_teacher` FROM class";
        mysql.pool.query(sql, function(error, result, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.class = result;
            complete();
        });
    }
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteclass.js"];
        var mysql = req.app.get('mysql');
        getClass(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('class', context);
            }
        }
    });
    //**** ADD CLASS AND REDIRECT ****//
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO class (`class_name`, `room_number`, `homeroom_teacher`) VALUES (?,?,?)";
        var inserts = [req.body.class_name, req.body.room_number, req.body.homeroom_teacher];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/class');
            }
        });
    });
    //**** DELETE CLASS ****//
    router.delete('/:class_code', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM class WHERE class_code = ?";
        var inserts = [req.params.class_code];
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