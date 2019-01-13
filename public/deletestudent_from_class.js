function deleteStudentFromClass(id){
    $.ajax({
        url: '/class_enrollmemt/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};