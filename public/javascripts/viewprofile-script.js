$(document).ready(function () {
    // $('.name').hide();
    // $('#saveProfileName, #cancelProfileName').hide();

    let passRegex =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if(window.location.href.indexOf('viewprofile') > -1) {
        $.get(window.location + '/user_info')
        .done(function(user) {
            localStorage.setItem('uid', user.id);
        })
    }

    $('#changeProfileName').click(function () {
        $('#nameSpan').hide();
        $('.name').show();
        $(this).hide();
        $('#saveProfileName, #cancelProfileName').show();

    });

    $('#cancelProfileName').click(function() {
        $('#saveProfileName').hide();
        $(this).hide();
        $('#changeProfileName').show();
        $('.name').hide();
        $('#nameSpan').show();
        
    })



    $('#changeProfilePass').click(function () {
        
        $('#profilePassword').hide();
        $('.pwd').show();
        $(this).hide();
        $('#saveProfilePass, #cancelProfilePass').show();    
        
    });

    $('#cancelProfilePass').click(function() {
        $('#saveProfilePass').hide();
        $(this).hide();
        $('#changeProfilePass').show();
        $('.pwd').hide();
        $('#profilePassword').show();
        $('#profileOldPass, #profileNewPass').val('');
    })


    $('#saveProfilePass').click(function() {
        var oldPass = $('#profileOldPass').val();
        var newPass = $('#profileNewPass').val();

        if(oldPass == '') {
            alert('Enter Old Password to Change!!');
        } else if(newPass == '') {
            alert('Enter New Password To Change!!');
        } else if(!passRegex.test(oldPass) || !passRegex.test(newPass)) {
            alert("Incorrect New Password\nPlease Enter Password of characters between 8-15 with atleast \n1. One Uppercase Letter \n2. One Lowercase Letter \n3.One Special Character");
        } else {
            $.post({
                url: window.location + '/changepassword',
                data: {
                    'uid': localStorage.getItem('uid'),
                    'new_password': newPass,
                    'old_password': oldPass
                }
            })
            .done(function(data) {
                if(data.result == 1) {
                    alert('Unknown Error Occured! Please Refresh the page and try again!!');
                } else if (data.result == 2) {
                    alert('Wrong Old Password');
                } else if (data.result == 3) {
                    alert('Success!!');
                }
            })
            .fail(function() {
                alert('Error Occured while changing password Please try again!');
            })
        }

        $('#saveProfilePass').hide();
        $(this).hide();
        $('#changeProfilePass').show();
        $('.pwd').hide();
        $('#profilePassword').show();
        $('#profileOldPass, #profileNewPass').val('');
    })

});