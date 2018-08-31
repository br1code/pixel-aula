"use strict";

(function() {

    // add hidden inputs with a name-value pair to send extra data
    function addHidden(form, name, value) {
        let input = $("<input>").attr("type", "hidden").attr("name", name).val(value);
        form.append($(input));
    }
    
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
    
    function getTagsSelected() {
        let tagsSelected = [];
        let currentTags = $('.badge');
        currentTags.each(function() {
            tagsSelected.push($(this).text());
        });
        return tagsSelected;
    }
    
    function addDeleteTagEvents() {
        let currentTags = $('.badge');
        // prevent duplicate events
        currentTags.off('click');
        currentTags.on('click', function(e) {
            $(this).remove();
        });
    }

    // create selected tags with its appropriate color
    $('#tags').on('change', function() {
        let tagNameSelected = $(this).val();

        // prevent duplicate tags
        if (getTagsSelected().indexOf(tagNameSelected) != -1) return;

        let badgeClass = selectBadgeClass(tagNameSelected);
        let spanTag = `<span style='margin: auto .10rem;' class='badge badge-${badgeClass}'>${tagNameSelected}</span>`;
        $('#tagList').append(spanTag);
        addDeleteTagEvents();
    });
    
    // add hidden inputs to send the selected tags with the form
    $('#myForm').on('submit', function(e) {
        let tagsSelected = getTagsSelected();
        for (let i = 0; i < tagsSelected.length; i++) {
            addHidden($(this), 'topic[tags]['+ i + ']', tagsSelected[i]);
        }
    });
    
})();
