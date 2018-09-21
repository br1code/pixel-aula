'use strict';

const express = require('express');

const router = express.Router();

// INDEX - Show index page
router.get('/inicial-primario', (req, res) => {
    res.render('./sections/inicial-primario', {backUrl: '/'});
});

module.exports = router;

