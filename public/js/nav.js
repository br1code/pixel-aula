"use strict";

(function() {
    function getPathActive() {
        let paths = ['inicial-primario', 'secundario-tecnico', 'foro', 'practicas-profesionalizantes'];
        let currentPath = $(location).attr('pathname');
        let pathActive;
        paths.forEach(function(path) {
            if (currentPath.indexOf(path) !== -1) {
                pathActive = path;
            }
        });
        return pathActive;
    }

    function setItemActive(pathActive) {
        $('.nav-item').each(function() {
            let currentItem = $(this);
            if (currentItem.attr('data-name') === pathActive) {
                currentItem.addClass('active');
            }
        });
    }

    setItemActive(getPathActive());
})();