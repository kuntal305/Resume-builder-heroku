$(document).ready(function () {
    
    // $('.name').hide();
    // $('#saveProfileName, #cancelProfileName').hide();

    let passRegex =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if(window.location.href.indexOf('viewprofile') > -1) {
        $.get(window.location + '/user_info')
        .done(function(user) {
            localStorage.setItem('uid', user.id);
            // console.log(user);
            $('#profilephoto').attr('src', 'data:image/jpeg;base64,'+ user.profile_image);
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


    const maxSize = 50 * 1024;

    $('#changeprofilephoto').on("click", function() {
        // console.log('form')
        var formData = new FormData();
        var file = $('#uploadprofilephoto').prop('files')[0];
        formData.append('file', file);
        if(!file) {
            alert('Please Choose an image first!!');
        } else if(file.size > maxSize) {
            alert('File Size Cannot Exceed 50 KB');
        } else {

            $.ajax({
                type: 'put',
                url: window.location + '/uploadprofilephoto/' + localStorage.getItem('uid'),
                data: formData,
                contentType: false,
                processData: false,
                success: function(data) {
                    if (data.success == 1) {
                        $('#uploadphotoform').trigger('reset');
                        var imgSrc = `data:image/${data.ext};base64,${data.string}`;
                        // console.log(imgSrc);
                        $('#profilephoto').attr('src', imgSrc);
                    } else if (data.success == 0) {
                        alert(data.err)
                    } 
                },
                fail: function(message) {
                    alert(message)
                }
            })
        }
    })

    
   
   
   
   
    // $('#changeprofilephoto').click(function() {
    //     var file = $('#uploadprofilephoto').prop('files')[0];
    //     if(!file) {
    //         alert('Please Choose an image first!!');
    //     } else if(file.size > maxSize) {
    //         alert('File Size Cannot Exceed 50 KB');
    //     } else {
    //         var reader = new FileReader();

    //         reader.onload = function() {
    //             // var base64data = reader.result.split('data:image/*;base64,');
    //             console.log(reader.result.length);
    //             $.post({
    //                 url: window.location + '/uploadprofilephoto',
    //                 data: {
    //                     id: localStorage.getItem('uid'),
    //                     image: reader.result
    //                 }
    //             })
    //             .done(function() {
    //                 $('#profilephoto').attr('src', reader.result);
    //                 alert('Success');
    //             })  
    //             .fail(function() {
    //                 alert('An Error Occurred! Please Try again');
    //             })
    //         }

    //         reader.readAsDataURL(file);
    //     }
        
    // })
});