'use strict';

const express = require('express');

const router = express.Router();

// INDEX - Show index page
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;