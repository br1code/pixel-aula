"use strict";

(function() {
    
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
    
    $('#search').on('input', function() {
        let textSearch = getCleanedString($(this).val());
        // remove white spaces too
        textSearch = textSearch.replace(/ /g, '');

        // prevent filter without any search
        if (!textSearch) return $('.card').show();
        
        // filter each thread to show or hide
        $('.card').each(function() {
            let threadData = getCleanedString($(this).attr('full-data'));
            if (haveCoincidences(threadData, textSearch)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
})();
