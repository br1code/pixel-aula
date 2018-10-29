(function() {
    "use strict";
    let contactForm = $('#contactForm');
    
    contactForm.on('submit', function(e) {
        e.preventDefault();
        $('#success').modal();
    });

    $('#closeMessage').click(function() {
        contactForm.trigger('reset');
    });
})();