'use strict';

const express = require('express');

const router = express.Router();

// INDEX - Show index page
router.get('/tecnico', (req, res) => {
    res.render('./sections/tecnico');
});

module.exports = router;