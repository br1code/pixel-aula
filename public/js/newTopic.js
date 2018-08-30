let badgesClasses = ['primary', 'success', 'danger', 'warning', 'info', 'dark'];

let badges = {
    Superior: 'primary',
    Universitario: 'success',
    Consultas: 'danger',
    Noticias: 'warning',
    Discusión: 'info',
    Otros: 'dark',
    Default: 'primary'
};


var form = $('#myForm');
var tagSelect = $('#tags');
var tagList = $('#tagList');


tagSelect.on('change', function() {
    let tagNameSelected = $(this).val();
    if (getTagsSelected().indexOf(tagNameSelected) != -1) {
        return;
    }
    let badgeClass = selectBadgeClass(tagNameSelected);
    let spanTag = "<span style='margin: auto .10rem;' class='badge badge-" + badgeClass + "'>" + tagNameSelected + "</span>";
    tagList.append(spanTag);
    updateDeleteTagEvent();
});

function selectBadgeClass(tagNameSelected) {
    if (badges[tagNameSelected]) {
        return badges[tagNameSelected];
    }
    return badges.Default;
}

function updateDeleteTagEvent() {
    let currentTags = $('.badge');
    currentTags.off('click');
    currentTags.on('click', function(e) {
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
    let tagsSelected = getTagsSelected();
    for (let i = 0; i < tagsSelected.length; i++) {
        form.addHidden('topic[tags]['+ i + ']', tagsSelected[i]);
    }
});

function getTagsSelected() {
    let currentTags = $('.badge');
    let tagsSelected = [];
    currentTags.each(function() {
        tagsSelected.push($(this).text());
    });
    return tagsSelected;
}