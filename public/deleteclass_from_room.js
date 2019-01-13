function deleteClassFromRoom(id){
    $.ajax({
        url: '/class_rooms/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};