$(document).ready(function () {
    

    $("#forgotpassbtn").click(function (e) {
        $('#forgotpass-alert').hide();
        $('#forgotpass-alert').removeClass('alert-success alert-danger alert-warning');
        e.preventDefault();
        console.log('Forgot')
        let emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
        
        var email = $('#forgotpass-email').val();
        if(!emailRegex.test(email)) {
            alert("Enter Proper Email Address!!");
        } else {
            $.post({
                url: window.location + '/sendemail',
                data: {
                    email: email
                }
            })
            .done(function(info) {
                if (info.success) {
                    $('#forgotpass-alert').addClass('alert-success');
                } else {
                    $('#forgotpass-alert').addClass('alert-warning');
                }
                $('#forgotpass-msg').html(`<b>${info.message}</b>`);
                $('#forgotpass-alert').show();
            })
            .fail(function() {
                $('#forgotpass-alert').addClass('alert-danger');
                $('#forgotpass-msg').html('<b>An Error occurred!!</b> Please Try Again.');
                $('#forgotpass-alert').show();
            })
        }
    })

    $('#forgotpassbackbtn').click(function() {
        window.location.href = window.location.href.replace('/forgotpassword', '');
    })
});