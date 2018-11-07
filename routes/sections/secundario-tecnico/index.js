'use strict';

const express = include('express');

const router = express.Router();

// INDEX - Show index page
router.get('/secundario-tecnico', (req, res) => {
    res.render('./sections/secundario-tecnico', {backUrl: '/'});
});

module.exports = router;