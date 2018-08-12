'use strict';

const express = require('express');

const router = express.Router();

// INDEX - Show index page
router.get('/primario', (req, res) => {
    res.render('./sections/primario');
});

module.exports = router;