(function() {
    "use strict";
    $('.fas').each(function() {
        let color = $(this).attr('color-data');
        $(this).css('color', color);
    });
})();