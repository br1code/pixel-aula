'use strict';

const express = require('express');

const router = express.Router();

// INDEX - Show index page
router.get('/superior', (req, res) => {
    res.render('./sections/superior');
});

module.exports = router;