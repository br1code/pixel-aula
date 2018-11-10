'use strict';

const express = include('express');

const router = express.Router();

router.get('/inicial-primario', (req, res) => {
    res.render('./sections/inicial-primario', {backUrl: '/'});
});

module.exports = router;

