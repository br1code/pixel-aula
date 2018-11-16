(function() {
    'use strict';

    function get(query) { return document.querySelector(query) };

    $('#explanation').on('hide.bs.modal', function stopVideo() {
        let iframe = get('iframe');
        let video = get('video');

        if (iframe) iframe.src = iframe.src;
        if (video) video.pause();
    });
})();