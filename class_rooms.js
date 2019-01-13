module.exports = function(){
    var express = require('express');
    var router = express.Router();
    function getClassRoom(res, mysql, context, complete){
        var sql = "SELECT `id`, `class_code`, `room_number` FROM class_located_in_room";
        mysql.pool.query(sql, function(error, result, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.class_rooms = result;
            complete();
        });
    }
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteclass_from_room.js"];
        var mysql = req.app.get('mysql');
        getClassRoom(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('class_rooms', context);
            }
        }
    });
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM class_located_in_room WHERE id = ?";
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
    return router;
}();