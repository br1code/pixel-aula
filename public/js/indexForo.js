"use strict";

let badges = {
    Superior: 'primary',
    Universitario: 'success',
    Consultas: 'danger',
    Noticias: 'warning',
    Discusión: 'info',
    Otros: 'dark',
    Default: 'primary'
};

function selectBadgeClass(tagNameSelected) {
    if (badges[tagNameSelected]) {
        return badges[tagNameSelected];
    }
    return badges.Default;
}

$(document).ready(function() {
    $('.badge').each(function() {
        let tagNameSelected = $(this).text();
        let badgeClass = "badge-" + selectBadgeClass(tagNameSelected);
        $(this).addClass(badgeClass);
    });
});