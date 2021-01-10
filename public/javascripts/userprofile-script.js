
$(document).ready(function () {
    $.get({
            url: window.location + '/user_info'
    })
    .done(function (user) {
        localStorage.setItem('uid', user.id);
    })

    $('#proceed').click(function () {
        var uid = localStorage.getItem('uid');
        window.location.href = window.location + '/viewresume/' + uid;
    })



    $('#view-resume-sidenav').click(function() {
        $(this).attr('href', $(this).attr('href') + '/' + localStorage.getItem('uid'));
    })
});



