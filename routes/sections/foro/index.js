'use strict';

const express               = require('express'),
    moment                  = require('moment'),
    Topic                   = require('../../../models/topic'),
    Answer                  = require('../../../models/topic');

const router = express.Router();

// INDEX - Show index page of the forum
router.get('/foro', (req, res) => {
    res.render('./sections/foro');
});

// NEW - Show form to create a new topic
router.get('/foro/nuevo', (req, res) => {
    res.render('./sections/foro/new');
});

// CREATE - Send the request to create a new topic
router.post('/foro/nuevo', (req, res) => {
    let newTopic = {
        name: req.body.topic.name,
        description: req.body.topic.description,
        date: moment().calendar(),
        tags: req.body.topic.tags
    };
    Topic.create(newTopic, (err, topic) => {
        if (err) {
            console.log('Error: ' + err);
            return res.redirect('/foro/nuevo');
        }
        res.redirect('/foro/nuevo_exito');
    });
});

router.get('/foro/nuevo_exito', (req, res) => {
    res.render('./sections/foro/success');
});

// SHOW - Show more info about one topic
router.get('/foro/:id', (req, res) => {
    Topic.findById(req.params.id)
        .populate('answers')
        .exec((err, topic) => {
            if (err || !topic) {
                console.log('Error: ' + err);
                return res.redirect('/foro');
            }
            res.render('/foro/show', {topic});
        })
});

// CREATE - Add new answer to a particular topic
router.post('/foro/:id/respuesta', (req, res) => {
    Topic.findById(req.params.id, (err, topic) => {
        if (err || !topic) {
            console.log('Error: ' + err);
            return res.redirect('/foro');
        }
        Answer.create(req.body.answer, (err, answer) => {
            if (err) {
                console.log('Error: ' + err);
                return res.redirect('/foro/' + req.params.id);
            }
            // add extra data to the new answer and save
            answer.date = moment().calendar();
            answer.save();
            // add new answer to the topic and save
            topic.answers.push(answer);
            topic.save();
            res.redirect('/foro/' + req.params.id);
        });
    });
});

module.exports = router;