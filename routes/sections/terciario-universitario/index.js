'use strict';

const express = require('express');
const foroRoutes = require('./foro');

const router = express.Router();

// INDEX - Show index page
router.get('/terciario-universitario', (req, res) => {
    res.render('./sections/terciario-universitario');
});

router.use('/terciario-universitario', foroRoutes);

module.exports = router;