function searchStudent(id){
    $.ajax({
        url: '/search-student/' + id,
        type: 'GET',
        success: function(result){
            window.location.replace("./");
        }
    })
};