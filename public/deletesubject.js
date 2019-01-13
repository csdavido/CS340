function deleteSubject(subject_code){
    $.ajax({
        url: '/subject/' + subject_code,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};