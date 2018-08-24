'use strict';

const express = require('express');

const router = express.Router();

// INDEX - Show index page
router.get('/practicas-profesionalizantes', (req, res) => {
    res.render('./sections/practicas-profesionalizantes');
});

module.exports = router;