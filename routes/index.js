'use strict';

const express = include('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {backUrl: '/'});
});

router.get('/licencias', (req, res) => {
    res.render('licenses', {backUrl: '/'});
});

router.get('/contacto', (req, res) => {
    res.render('contact', {backUrl: '/'});
});

module.exports = router;