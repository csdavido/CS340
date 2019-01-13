module.exports = function(){
    var express = require('express');
    var router = express.Router();
    //******************** ROOM PAGE ********************//
    //**** ROOM LIST ****//
    function getRoom(res, mysql, context, complete){
        var sql = "SELECT `room_id`, `room_number`, `room_name` FROM room";
        mysql.pool.query(sql, function(error, result, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.room = result;
            complete();
        });
    }
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteroom.js"];
        var mysql = req.app.get('mysql');
        getRoom(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('room', context);
            }
        }
    });
    //**** ADD ROOM AND REDIRECT ****//
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO room (`room_number`, `room_name`) VALUES (?, ?)";
        var inserts = [req.body.room_number, req.body.room_name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/room');
            }
        });
    });
    //**** DELETE ROOM ****//
    router.delete('/:room_number', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM room WHERE room_id = ?";
        var inserts = [req.params.room_id];
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