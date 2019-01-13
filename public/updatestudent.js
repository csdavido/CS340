function updateStudent(id){
    $.ajax({
        url: '/student/' + id,
        type: 'PUT',
        data: $(`#update-student`).serialize(),
        success: function(result){
            window.location.replace("./");
            console.log("updateStudent executed successfully");
        }
    })
};