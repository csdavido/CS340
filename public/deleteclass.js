function deleteClass(class_code){
    $.ajax({
        url: '/class/' + class_code,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};