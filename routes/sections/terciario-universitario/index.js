'use strict';

const express = require('express');

const router = express.Router();

// INDEX - Show index page
router.get('/terciario-universitario', (req, res) => {
    res.render('./sections/terciario-universitario');
});

module.exports = router;