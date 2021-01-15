
$(document).ready(function () {
    
    
    if(window.location.href.indexOf('userprofile') > -1) {
        $.get({
            url: window.location + '/user_info'
        })
        .done(function (user) {
            localStorage.setItem('uid', user.id);
        })
    }
    

    $('#proceed').click(function () {
        var uid = localStorage.getItem('uid');
        // window.location.href = window.location + '/viewresume/' + uid;
        $(this).hide("fast");
        $('.continue-spinner').show("slow").css('display', 'inline-block');
        $.get({
            url: window.location + '/validatecvdata/' + uid
        })
        .done(function (data) {
            if(data.user_info == 0) {
                alert("Enter Basic info");
            } else if(data.user_education == 0) {
                alert("Enter Education info");
            } else if (data.user_misc_info == 0) {
                alert("Enter Misc info");
            } else if(data.user_end_note == 0) {
                alert("Enter End Note");
            } else {
                $('#templateSelectionModal').modal("show");
            }
            $('.continue-spinner').hide("fast");
            $('#proceed').show("slow");
        })
        .fail(function () {
            alert('Error in sending request');
            $('.continue-spinner').hide("fast");
            $(this).show("slow");
        })
    })

    $('#selectTemplate').click(function () {
        var templateId;
        var val = document.getElementsByName('templateId');
        for(let i=0; i<val.length; i++) {
            if(val[i].checked) {
                templateId = val[i].value;
            }
        }
        console.log(templateId);
        window.location.href = window.location + '/viewresume/' + localStorage.getItem('uid') + '?templateId=' + templateId;
    })



    $('#view-resume-sidenav').click(function() {
        $(this).attr('href', $(this).attr('href') + '/' + localStorage.getItem('uid'));
    })

    
});



