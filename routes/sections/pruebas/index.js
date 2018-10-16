'use strict';

const express = require('express');
const testsLogic = require('../../../logic/tests');

const router = express.Router();

// GET /pruebas - Index, permite elegir entre crear una prueba nueva o realizar una 
router.get('/pruebas', (req, res) => {
    res.render('./sections/pruebas', {backUrl: '/'});
});

// CREAR PRUEBA -------------------------------------------------------------------------------------------

// GET /pruebas/crear - Permite crear una prueba nueva, formulario completo
router.get('/pruebas/crear', (req, res) => {
    res.render('./sections/pruebas/new', {backUrl: '/pruebas'});
});

// POST /pruebas/crear - Recibe una prueba nueva y la guarda en la DB. Redirecciona a /pruebas/crear/exito
router.post('/pruebas/crear', (req, res) => {
    testsLogic.createTest(req.body.test, err => {
        if (err) {
            return res.redirect('/pruebas/crear');
        }
        res.redirect('/pruebas/crear/exito');
    });
});

// GET /pruebas/crear/exito
router.get('/pruebas/crear/exito', (req, res) => {
    res.render('./sections/pruebas/success', {backUrl: '/pruebas'});
});

// REALIZAR PRUEBA ----------------------------------------------------------------------------------------

// GET /pruebas/realizar - Permite ingresar un id para realizar una prueba
router.get('/pruebas/realizar', (req, res) => {
    res.render('./sections/pruebas/play', {backUrl: '/pruebas'});
});

// GET /pruebas/realizar/:id - Permite realizar una prueba buscandola por su id
router.get('/pruebas/realizar/:id', (req, res) => {
    testsLogic.findTest(req, (err, test) => {
        if (err) {
            return res.json({test: null});
        }
        res.json(test);
    });
});

// POST /pruebas/realizar/:id - Recibe una prueba realizada, guarda en DB y redirecciona a resultados
router.post('/pruebas/realizar', (req, res) => {
    testsLogic.saveResults(req, (err, results) => {
        if (err) {
            return res.json({results: null});
        }
        testsLogic.getPublicResults(results._id, (err, result) => {
            if (err || !result) res.json({results: null});
            res.json(result);
        });
    });
});

// GET /pruebas/realizar/:id/exito - Recibe un resultID y muestra stats de la prueba realizada
router.get('/pruebas/realizar/:id/resultados', (req, res) => {
    testsLogic.getResults(req.params.id, (err, results) => {
        if (err) {
            return res.redirect('/pruebas/realizar');
        }
        res.render('./sections/pruebas/results', {results, backUrl: '/pruebas'});
    });
});

module.exports = router;