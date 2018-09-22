'use strict';

const express               = require('express'),
    moment                  = require('moment'),
    Practice                = require('../../../models/practice');

const router = express.Router();

const practiceTypes = {Offer: 'offer', Request: 'request'};

moment.locale('es');

// GET - Index, te permite elegir si quieres ver pedidos u ofertas de prácticas
router.get('/practicas-profesionalizantes', (req, res) => {
    res.render('./sections/practicas-profesionalizantes', {backUrl: '/'});
});

// GET - Index ofertas, muestra las ofertas y un link para cargar una oferta
router.get('/practicas-profesionalizantes/ofertas', (req, res) => {
    Practice.find({type: 'offer'}, (err, practices) => {
        if (err) {
            // TODO: Handle error properly
            console.log('Error: ' + err);
            return res.redirect('/practicas-profesionalizantes');
        }
        res.render('./sections/practicas-profesionalizantes/offers', {
            practices: practices,
            backUrl: '/practicas-profesionalizantes'
        });
    });
});

// GET - Index pedidos, muestras los pedidos y un link para realizar un pedido
router.get('/practicas-profesionalizantes/pedidos', (req, res) => {
    Practice.find({type: 'request'}, (err, practices) => {
        if (err) {
            // TODO: Handle error properly
            console.log('Error: ' + err);
            return res.redirect('/practicas-profesionalizantes');
        }

        res.render('./sections/practicas-profesionalizantes/requests', {
            practices: practices,
            backUrl: '/practicas-profesionalizantes'
        });
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
    // TODO: validate data from the server
    Practice.create(req.body.practice, (err, practice) => {
        if (err) {
            // TODO: Handle error properly
            console.log('Error: ' + err);
            return res.redirect('/practicas-profesionalizantes/ofertas/nuevo');
        }

        // add extra data to the new practice and save
        practice.date = moment().format('ll');
        practice.type = practiceTypes.Offer;
        practice.save();

        res.redirect('/practicas-profesionalizantes/ofertas/' + practice._id);
    });
});

// POST - Crea el nuevo pedido y redirecciona al mismo
router.post('/practicas-profesionalizantes/pedidos/nuevo', (req, res) => {
    // TODO: validate data from the server
    Practice.create(req.body.practice, (err, practice) => {
        if (err) {
            // TODO: Handle error properly
            console.log('Error: ' + err);
            return res.redirect('/practicas-profesionalizantes/pedidos/nuevo');
        }

        // add extra data to the new practice and save
        practice.data = moment().format('ll');
        practice.type = practiceTypes.Request;
        practice.save();

        res.redirect('/practicas-profesionalizantes/pedidos/' + practice._id);
    });
});

// GET - Muestra una oferta
router.get('/practicas-profesionalizantes/ofertas/:offerId', (req, res) => {
    Practice.findById(req.params.offerId, (err, practice) => {
        if (err || !practice) {
            // TODO: Handle error properly
            console.log('Error: ' + err);
            return res.redirect('practicas-profesionalizantes/ofertas');
        }

        res.render('./sections/practicas-profesionalizantes/offer', {
            offer: practice,
            backUrl: '/practicas-profesionalizantes/ofertas'
        });
    });
});

// GET - Muestra un pedido
router.get('/practicas-profesionalizantes/pedidos/:requestId', (req, res) => {
    Practice.findById(req.params.requestId, (err, practice) => {
        if (err || !practice) {
            // TODO: Handle error properly
            console.log('Error: ' + err);
            return res.redirect('practicas-profesionalizantes/pedidos');
        }

        res.render('./sections/practicas-profesionalizantes/request', {
            request: practice,
            backUrl: '/practicas-profesionalizantes/pedidos'
        });
    });
});

// POST - Envía una solicitud de contacto de una oferta, redirecciona a una página de éxito
router.post('/practicas-profesionalizantes/ofertas/:offerId/contacto', (req, res) => {
    // TODO: add email logic
    let offerId = req.params.offerId;
    res.redirect('/practicas-profesionalizantes/ofertas/' + offerId + '/contacto-exito');
});

// POST - Envía una solicitud de contacto de un pedido, redirecciona a una página de éxito
router.post('/practicas-profesionalizantes/pedidos/:requestId/contacto', (req, res) => {
    // TODO: add email logic
    let requestId = req.params.requestId;
    res.redirect('/practicas-profesionalizantes/pedidos/' + requestId + '/contacto-exito');
});

// GET - Muestra un mensaje indicando que la solicitud de contacto de una oferta fue envíada
router.get('/practicas-profesionalizantes/ofertas/:offerId/contacto-exito', (req, res) => {
    Practice.findById(req.params.offerId, (err, practice) => {
        if (err || !practice) {
            // TODO: Handle error properly
            console.log('Error: ' + err);
            return res.redirect('/practicas-profesionalizantes/ofertas');
        }

        res.render('./sections/practicas-profesionalizantes/success', {
            practice: practice,
            backUrl: '/practicas-profesionalizantes/ofertas/' + practice._id
        });
    });
});

// GET - Muestra un mensaje indicando que la solicitud de contacto de un pedido fue envíada
router.get('/practicas-profesionalizantes/pedidos/:requestId/contacto-exito', (req, res) => {
    Practice.findById(req.params.offerId, (err, practice) => {
        if (err || !practice) {
            // TODO: Handle error properly
            console.log('Error: ' + err);
            return res.redirect('/practicas-profesionalizantes/pedidos');
        }

        res.render('./sections/practicas-profesionalizantes/success', {
            practice: practice,
            backUrl: '/practicas-profesionalizantes/pedidos/' + practice._id
        });
    });
});

module.exports = router;