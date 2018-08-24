'use strict';

const express = require('express');

const router = express.Router();

// INDEX - Show index page
router.get('/secundario-tecnico', (req, res) => {
    res.render('./sections/secundario-tecnico');
});

module.exports = router;