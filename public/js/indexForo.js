let badgesClasses = ['primary', 'success', 'danger', 'warning', 'info', 'dark'];

let tagIndex = 0;

function selectBadgeClass() {
    if (!badgesClasses[tagIndex]) {
        tagIndex = 0;
    }
    return badgesClasses[tagIndex];
}


$(document).ready(function() {
    $('.badge').each(function() {
        let badgeClass = "badge-" + selectBadgeClass();
        $(this).addClass(badgeClass);
        tagIndex++;
    });
});