"use strict";

(function() {
    function selectBadgeClass(tagNameSelected) {
        let badges = {
            Superior: 'primary',
            Universitario: 'success',
            Consultas: 'danger',
            Noticias: 'warning',
            Discusión: 'info',
            Otros: 'dark',
            Default: 'primary'
        };
        return badges[tagNameSelected] || badges.Default;
    }
    
    function haveCoincidences(strA, strB) {
        return strA.indexOf(strB) !== -1;
    }
    
    function getCleanedString(string) {
        string = string.replace(/á/gi, 'a');
        string = string.replace(/é/gi, 'e');
        string = string.replace(/í/gi, 'i');
        string = string.replace(/ó/gi, 'o');
        string = string.replace(/ú/gi, 'u');
        return string.toLowerCase();
    }
    
    $(document).ready(function() {
        $('.badge').each(function() {
            let tagNameSelected = $(this).text();
            let badgeClass = "badge-" + selectBadgeClass(tagNameSelected);
            $(this).addClass(badgeClass);
        });
    });
    
    $('#search').on('input', function() {
        let textSearch = getCleanedString($(this).val());
        // remove white spaces too
        textSearch = textSearch.replace(/ /g, '');

        // prevent filter without any search
        if (!textSearch) return topics.show();
        
        let topics = $('.card');
        topics.each(function() {
            let topicData = getCleanedString($(this).attr('fullData'));
            if (haveCoincidences(topicData, textSearch)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
})();


