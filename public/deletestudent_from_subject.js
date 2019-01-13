function deleteStudentFromSubject(id){
    $.ajax({
        url: '/subject_enrollmemt/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};