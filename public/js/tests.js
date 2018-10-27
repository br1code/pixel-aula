(function() {
    "use strict";

    // global vars
    var searchDiv;
    var searchInput;
    var searchForm;
    var nameDiv;
    var nameInput;
    var nameForm;

    function init() {
        // setup DOM elements
        searchDiv = $('#searchDiv');
        searchInput = $('#searchInput');
        searchForm = $('#searchForm');
        nameDiv = $('#nameDiv');
        nameInput = $('#nameInput');
        nameForm = $('#nameForm');

        // initialize UI
        searchDiv.show();
        nameDiv.hide();

        // setup events
        searchForm.on('submit', searchTest)
    }

    function searchTest(evt) {
        evt.preventDefault();
        
        // TODO: validate input
        let testID = searchInput.val();
        getTestByID(testID, startTest, searchAgain);
    }

    function startTest(data) {
        if (!data.test) return searchAgain(data);
        // TODO: hide searchForm, show testGame, initialize data
        searchDiv.hide();
        nameDiv.show();
        console.log(data);
    }

    function searchAgain(data){ 
        // TODO: show message error properly
        alert(data.error);
        searchInput.val('').focus();
    }

    // API utils
    function getTestByID(id, doneCallback, failCallback) {
        // TODO: replace local url
        let url = 'http://localhost:3000/pruebas/realizar/' + id;
        $.get(url).done(doneCallback).fail(failCallback);
    }


    init();
})();