'use strict';

const Test              = require('../models/test');
const Results           = require('../models/result');
const moment            = require('moment');

moment.locale('es');

function createTest(test, callback) {
    // i need to parse the test?
    Test.create(test, (err, newTest) => {
        if (err) return callback(err);

        // add extra data
        newTest.date = moment().format('ll');
        newTest.save();
        callback(null);
    });
}

// Send only the questions without the data of the correct answers
function findTest(id, callback) {
    Test.findById(id, (err, test) => {
        if (err || !test) return callback({test: '123', error: 'La prueba no fue encontrada'});
        callback(null, test);
    });
}

// Parse the request
function saveResults(req, callback) {
    Test.findById(testID, (err, test) => {
        if (err || !test) return callback(err);
        
        Results.create(results, (err, result) => {
            if (err) return callback(err);

            // add extra data
            result.date = moment().format('ll');
            result.save();
            test.results.push(result);
            test.save();
            callback(null, result);
        });
    });
}

function getPublicResults(id, callback) {
    Results.findById(id, (err, results) => {
        if (err || !results) return callback(err);
        
        Test.findById(results.testID, (err, test) => {
            if (err || !test) return callback(err);

            callback(null, calculateResults(test, results));
        });
    });
}

function getPrivateResults(id, callback) {

}

function calculateResults(test, results) {
    let correctAnswers = 0;

    for (let i = 0; i < test.questions.length; i++) {
        let answer = results.questions[i].answer;
        let correct = test.questions[i].correct;
        if (answer === correct) correctAnswers++;
    }

    return {
        correct: correctAnswers,
        incorrect: test.questions.length - correctAnswers,
        result: (publicResults.correct / test.questions.length) * 100
    };
}

module.exports = {
    createTest,
    findTest,
    saveResults,
    getPublicResults,
    getPrivateResults
};