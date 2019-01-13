function deleteSubjectFromRoom(id){
    $.ajax({
        url: '/subject_rooms/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};