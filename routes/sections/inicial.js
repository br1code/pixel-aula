'use strict';

const express = require('express');

const router = express.Router();

// INDEX - Show index page
router.get('/inicial', (req, res) => {
    res.render('./sections/inicial');
});

module.exports = router;

