'use strict';

$('#searchTest').on('submit', function(e) {
    e.preventDefault();

    let testID = $('#testID').val();
    let url = 'http://localhost:3000/pruebas/realizar/' + testID;

    // get test vía /pruebas/realizar/id
    $.get(url).done().fail();

    console.log('Sending request..');
});