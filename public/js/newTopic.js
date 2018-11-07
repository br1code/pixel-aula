(function() {
    'use strict';

    // add hidden inputs with a name-value pair to send extra data
    function addHidden(form, name, value) {
        let input = $("<input>").attr("type", "hidden").attr("name", name).val(value);
        form.append($(input));
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

    function tagWasAlreadySelected(tagList, tagSelected) {
        return tagList.indexOf(tagSelected) !== -1;
    }

    function createSpanTag(value) {
        return `<span style='margin: auto .10rem;' class='badge badge-primary'>${value}</span>`;
    }

    // create selected tags with its appropriate color
    $('#tags').on('change', function() {
        let currentTagSelected = $(this).val();
        let tagsSelected = getTagsSelected();

        // prevent duplicate tags
        if (tagWasAlreadySelected(tagsSelected, currentTagSelected)) return;

        let spanTag = createSpanTag(currentTagSelected);
        $('#tagList').append(spanTag);
        addDeleteTagEvents();
    });
    
    // add hidden inputs to send the selected tags with the form
    $('#myForm').on('submit', function(e) {
        let tagsSelected = getTagsSelected();
        for (let i = 0; i < tagsSelected.length; i++) {
            addHidden($(this), `topic[tags][${i}]`, tagsSelected[i]);
        }
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip({trigger: 'focus'});
    });
    
})();
