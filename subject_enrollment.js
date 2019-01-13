module.exports = function(){
    var express = require('express');
    var router = express.Router();
    function getSubjectEnrollment(res, mysql, context, complete){
        var sql = "SELECT `id`, `student_id`, `subject_code` FROM student_studies_subject";
        mysql.pool.query(sql, function(error, result, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.subject_enrollment = result;
            complete();
        });
    }
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletestudent_from_subject.js"];
        var mysql = req.app.get('mysql');
        getSubjectEnrollment(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('subject_enrollment', context);
            }
        }
    });
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM student_studies_subject WHERE id = ?";
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