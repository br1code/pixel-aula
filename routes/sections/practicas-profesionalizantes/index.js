'use strict';

const express               = require('express'),
    moment                  = require('moment'),
    Practice                = require('../../../models/practice');

const router = express.Router();

moment.locale('es');

// GET - Index, te permite elegir si quieres ver pedidos u ofertas de prácticas
router.get('/practicas-profesionalizantes', (req, res) => {
    res.render('./sections/practicas-profesionalizantes', {backUrl: '/'});
});

// GET - Index ofertas, muestra las ofertas y un link para cargar una oferta
router.get('/practicas-profesionalizantes/ofertas', (req, res) => {
    res.render('./sections/practicas-profesionalizantes/offers', {
        backUrl: '/practicas-profesionalizantes'
    });
});

// GET - Index pedidos, muestras los pedidos y un link para realizar un pedido
router.get('/practicas-profesionalizantes/pedidos', (req, res) => {
    res.render('./sections/practicas-profesionalizantes/requests', {
        backUrl: '/practicas-profesionalizantes'
    });
});

// GET - Formulario para cargar una oferta
router.get('/practicas-profesionalizantes/ofertas/nuevo', (req, res) => {
    res.render('./sections/practicas-profesionalizantes/newOffer', {
        backUrl: '/practicas-profesionalizantes/ofertas'
    });
});

// GET - Formulario para realizar un pedido
router.get('/practicas-profesionalizantes/pedidos/nuevo', (req, res) => {
    res.render('./sections/practicas-profesionalizantes/newRequest', {
        backUrl: '/practicas-profesionalizantes/pedidos'
    });
});

// POST - Crea la nueva oferta y redirecciona a la misma
router.post('/practicas-profesionalizantes/ofertas/nuevo', (req, res) => {
    // redirect to new offer
});

// POST - Crea el nuevo pedido y redirecciona al mismo
router.post('/practicas-profesionalizantes/pedidos/nuevo', (req, res) => {
    // redirect to new request
});

// GET - Muestra una oferta
router.get('/practicas-profesionalizantes/ofertas/:offerId', (req, res) => {
    let offerId = req.params.offerId;
});

// GET - Muestra un pedido
router.get('/practicas-profesionalizantes/pedidos/:requestId', (req, res) => {
    let requestId = req.params.requestId;
});

// POST - Envía una solicitud de contacto de una oferta, redirecciona a una página de éxito
router.post('/practicas-profesionalizantes/ofertas/:offerId/contacto', (req, res) => {
    let offerId = req.params.offerId;
});

// POST - Envía una solicitud de contacto de un pedido, redirecciona a una página de éxito
router.post('/practicas-profesionalizantes/pedidos/:requestId/contacto', (req, res) => {
    let requestId = req.params.requestId;
});

// GET - Muestra un mensaje indicando que la solicitud de contacto de una oferta fue envíada
router.get('/practicas-profesionalizantes/ofertas/:offerId/contacto-exito', (req, res) => {
    // find offer and render page
});

// GET - Muestra un mensaje indicando que la solicitud de contacto de un pedido fue envíada
router.get('/practicas-profesionalizantes/pedidos/:requestId/contacto-exito', (req, res) => {
    // find request and render page
});

module.exports = router;