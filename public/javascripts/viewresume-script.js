$(document).ready(function () {
    $('#temp-save').click(function () {
        var doc = new jsPDF();

        var elementHTML = $('#template-data').html();
        var specialElementHandlers = {
            '#elementH': function (element, renderer) {
                return true;
            }
        };
        doc.fromHTML(elementHTML, 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });

        // Save the PDF
        doc.save('cv.pdf');
    });

});