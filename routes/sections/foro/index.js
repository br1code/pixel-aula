'use strict';

const express               = require('express'),
    moment                  = require('moment'),
    Topic                   = require('../../../models/topic'),
    Thread                  = require('../../../models/thread'),
    Comment                 = require('../../../models/comment');

const router = express.Router();

moment.locale('es');

// GET - Index del foro, muestra todos los topics y un link para proponer uno nuevo
router.get('/foro', (req, res) => {
    Topic.find({}, (err, topics) => {
        if (err) {
            // TODO: Handle error properly
            console.log('Error: ' + err);
            return res.render('./sections/foro');
        }

        res.render('./sections/foro', {topics});
    });
});

// GET - Formulario para proponer un nuevo topic
router.get('/foro/nuevo', (req, res) => {
    res.render('./sections/foro/newTopic');
});

// POST - Envia la solicitud del nuevo topic y redirecciona a /foro/nuevo-exito
router.post('/foro/nuevo', (req, res) => {
    Topic.create(req.body.topic, (err, topic) => {
        if (err) {
            // TODO: Handle error properly
            console.log('Error: ' + err);
            return res.redirect('/foro/nuevo');
        }

        res.redirect('/foro/nuevo-exito');
    });
});

// GET - Muestra un mensaje indicando que el tema será aprobado o no en 24 hs
router.get('/foro/nuevo-exito', (req, res) => {
    res.render('./sections/foro/success');
});

// GET - Muestra un topic con todos sus threads y un link para crear un thread
router.get('/foro/:topicId', (req, res) => {
    Topic.findById(req.params.topicId)
        .populate('threads')
        .exec((err, topic) => {
            if (err || !topic) {
                // TODO: Handle error properly
                console.log('Error: ' + err);
                return res.redirect('/foro');
            }

            res.render('./sections/foro/topic', {topic});
        });
});

// GET - Formulario para crear un nuevo thread para el topic actual
router.get('/foro/:topicId/nuevo', (req, res) => {
    Topic.findById(req.params.topicId, (err, topic) => {
        if (err || !topic) {
            // TODO: Handle error properly
            console.log('Error: ' + err);
            return res.redirect('/foro');
        }
        res.render('./sections/foro/newThread', {topic});
    });
});

// POST - Crea el nuevo thread y lo agrega a la base de datos. Redirecciona al nuevo thread
router.post('/foro/:topicId/nuevo', (req, res) => {
    Topic.findById(req.params.topicId, (err, topic) => {
        if (err || !topic) {
            // TODO: Handle error properly
            console.log('Error: ' + err);
            return res.redirect('/foro/' + req.params.topicId + '/nuevo');
        }
        
        Thread.create(req.body.thread, (err, thread) => {
            if (err) {
                // TODO: Handle error properly
                console.log('Error: ' + err);
                return res.redirect('/foro/' + req.params.topicId);
            }

            // add extra data to the new thread and save
            thread.date = moment().format('ll');
            thread.save();
            // add new thread to the topic and save
            topic.threads.push(thread);
            topic.save();

            res.redirect('/foro/' + req.params.topicId + '/' + thread._id);
        });
    });
});

// GET - Muestra un thread con todos sus comments y un formulario para crear un comment
router.get('/foro/:topicId/:threadId', (req, res) => {
    Topic.findById(req.params.topicId, (err, topic) => {
        if (err || !topic) {
            // TODO: Handle error properly
            console.log('Error: ' + err);
            return res.redirect('/foro');
        }

        Thread.findById(req.params.threadId)
            .populate('comments')
            .exec((err, thread) => {
                if (err || !thread) {
                    // TODO: Handle error properly
                    console.log('Error: ' + err);
                    return res.redirect('/foro/' + req.params.topicId);
                }

                res.render('./sections/foro/thread', {topic, thread});
            });
    });
});

// POST - Crea un nuevo comment y lo agrega a la base de datos, redirecciona al mismo thread
router.post('/foro/:topicId/:threadId/comentario', (req, res) => {
    Topic.findById(req.params.topicId, (err, topic) => {
        if (err || !topic) {
            // TODO: Handle error properly
            console.log('Error: ' + err);
            return res.redirect('/foro');
        }

        Thread.findById(req.params.threadId, (err, thread) => {
            if (err || !thread) {
                // TODO: Handle error properly
                console.log('Error: ' + err);
                return res.redirect('/foro/' + req.params.topicId);
            }

            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    // TODO: Handle error properly
                    console.log('Error: ' + err);
                    return res.redirect('/foro/' + req.params.topicId + '/' + req.params.threadId);
                }

                // add extra data to the new comment and save
                comment.date = moment().format('ll');
                comment.color = selectRandomColor();
                comment.save();
                // add new comment to the thread and save
                thread.comments.push(comment);
                thread.save();

                res.redirect('/foro/' + req.params.topicId + '/' + req.params.threadId);
            });
        });
    });
});

function selectRandomColor() {
    let colors = ['#0E7C7B', '#D81E5B', '#E28413', '#6153CC', '#E84855', '#AA4465', '#A755C2', '#21897E', '#540D6E'];
    return colors[Math.floor(Math.random()*colors.length)];
}

module.exports = router;