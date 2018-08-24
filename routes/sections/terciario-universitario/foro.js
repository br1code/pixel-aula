'use strict';

const express = require('express');

const router = express.Router();

// INDEX - Show index page
router.get('/foro', (req, res) => {
    res.render('./sections/terciario-universitario/foro');
});

router.get('/foro/nuevo', (req, res) => {
    res.render('./sections/terciario-universitario/foro/new');
});

module.exports = router;