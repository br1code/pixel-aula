'use strict';

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/licencias', (req, res) => {
    res.render('licenses');
});

module.exports = router;