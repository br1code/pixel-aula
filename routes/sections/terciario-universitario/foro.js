'use strict';

const express               = require('express'),
    moment                  = require('moment');

const router = express.Router();

// INDEX - Show index page of the forum
router.get('/foro', (req, res) => {
    res.render('./sections/terciario-universitario/foro');
});

// NEW - Show form to create a new topic
router.get('/foro/nuevo', (req, res) => {
    res.render('./sections/terciario-universitario/foro/new');
});

// CREATE - Send the request to create a new topic
router.post('/foro/nuevo', (req, res) => {
    // logic for send the email with the new topic
    res.redirect('/terciario-universitario/foro/nuevo_exito');
});

router.get('/foro/nuevo_exito', (req, res) => {
    res.render('./sections/terciario-universitario/foro/success');
});

// SHOW - Show more info about one topic
router.get('/foro/:id', (req, res) => {
    // find the topic by id
    // populate the answers
    // render the view
    res.render('/sections/terciario-universitario/foro/show');
});

// CREATE - Add new answer to a particular topic
router.post('/foro/:id/respuesta', (req, res) => {
    // find the topic by id
    // then create the answer and add it to the db
    // redirect to the topic
});

module.exports = router;