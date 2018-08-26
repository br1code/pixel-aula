let badgesClasses = ['primary', 'success', 'danger', 'warning', 'info', 'dark'];


var form = $('#myForm');
var tagSelect = $('#tags');
var tagList = $('#tagList');
var tagsSelected = [];
var tagIndex = 0;


tagSelect.on('change', function() {
    let tagNameSelected = $(this).val();
    if (tagsSelected.indexOf(tagNameSelected) !== -1) {
        return;
    }
    let badgeClass = selectBadgeClass();
    let spanTag = "<span style='margin: auto .10rem;' class='badge badge-" + badgeClass + "'>" + tagNameSelected + "</span>";
    tagList.append(spanTag);
    tagsSelected.push(tagNameSelected);
    tagIndex++;
    updateDeleteTagEvent();
});

function selectBadgeClass() {
    if (!badgesClasses[tagIndex]) {
        tagIndex = 0;
    }
    return badgesClasses[tagIndex];
}

function updateDeleteTagEvent() {
    let currentTags = $('.badge');
    currentTags.off('click');
    currentTags.on('click', function(e) {
        let tagName = $(this).html();
        let tagIndex = tagsSelected.indexOf(tagName);
        tagsSelected.splice(tagIndex, 1);
        $(this).remove();
    });
}

jQuery.fn.addHidden = function (name, value) {
    return this.each(function () {
        var input = $("<input>").attr("type", "hidden").attr("name", name).val(value);
        $(this).append($(input));
    });
};

form.on('submit', function(e) {
    for (let i = 0; i < tagsSelected.length; i++) {
        form.addHidden('tags['+ i + ']', tagsSelected[i]);
    }
});