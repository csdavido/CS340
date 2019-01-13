function deleteStudent(id){
    $.ajax({
        url: '/student/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};