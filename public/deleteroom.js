function deleteRoom(room_number){
    $.ajax({
        url: '/room/' + room_number,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};