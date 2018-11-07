'use strict';

const express                               = include('express'),
      moment                                = include('moment'),
      Practice                              = include('models/practice');

const router = express.Router();

const practiceTypes = {Offer: 'offer', Request: 'request'};

moment.locale('es');

// GET - Index, te permite elegir si quieres ver pedidos u ofertas de prácticas
router.get('/practicas-profesionalizantes', (req, res) => {
    res.render('./sections/practicas-profesionalizantes', {backUrl: '/'});
});

// GET - Index ofertas, muestra las ofertas y un link para cargar una oferta
router.get('/practicas-profesionalizantes/ofertas', (req, res) => {
    Practice.find({type: practiceTypes.Offer}, (err, practices) => {
        if (err) return res.redirect('/practicas-profesionalizantes');

        res.render('./sections/practicas-profesionalizantes/offers', {
            practices: practices,
            backUrl: '/practicas-profesionalizantes'
        });
    });
});

// GET - Index pedidos, muestras los pedidos y un link para realizar un pedido
router.get('/practicas-profesionalizantes/pedidos', (req, res) => {
    Practice.find({type: practiceTypes.Request}, (err, practices) => {
        if (err) return res.redirect('/practicas-profesionalizantes');

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

// POST - Crea la nueva oferta y redirecciona a la pagina de success
router.post('/practicas-profesionalizantes/ofertas/nuevo', (req, res) => {
    // TODO: validate data from the server
    Practice.create(req.body.practice, (err, practice) => {
        if (err) return res.redirect('/practicas-profesionalizantes/ofertas/nuevo');

        // add extra data to the new practice and save
        practice.date = moment().format('ll');
        practice.type = practiceTypes.Offer;
        practice.save();

        res.redirect('/practicas-profesionalizantes/ofertas/' + practice._id + '/nuevo-exito');
    });
});

// POST - Crea el nuevo pedido y redirecciona a la pagina de success
router.post('/practicas-profesionalizantes/pedidos/nuevo', (req, res) => {
    // TODO: validate data from the server
    Practice.create(req.body.practice, (err, practice) => {
        if (err) return res.redirect('/practicas-profesionalizantes/pedidos/nuevo');

        // add extra data to the new practice and save
        practice.data = moment().format('ll');
        practice.type = practiceTypes.Request;
        practice.save();

        res.redirect('/practicas-profesionalizantes/pedidos/' + practice._id  + '/nuevo-exito');
    });
});

// GET - Muestra un mensaje indicando que la oferta se ha creado, contiene link hacia la oferta
router.get('/practicas-profesionalizantes/ofertas/:offerID/nuevo-exito', (req, res) => {
    let offerID = req.params.offerID;
    res.render('./sections/practicas-profesionalizantes/offerSuccess', {
        offerID, backUrl: '/practicas-profesionalizantes/ofertas'
    });
});

// GET - Muestra un mensaje indicando que el pedido se ha registrado, contiene link hacia el pedido
router.get('/practicas-profesionalizantes/pedidos/:requestID/nuevo-exito', (req, res) => {
    let requestID = req.params.requestID;
    res.render('./sections/practicas-profesionalizantes/requestSuccess', {
        requestID,
        backUrl: '/practicas-profesionalizantes/pedidos'
    });
});

// GET - Muestra una oferta
router.get('/practicas-profesionalizantes/ofertas/:offerID', (req, res) => {
    Practice.findById(req.params.offerID, (err, practice) => {
        if (err || !practice) return res.redirect('practicas-profesionalizantes/ofertas');

        res.render('./sections/practicas-profesionalizantes/offer', {
            offer: practice,
            backUrl: '/practicas-profesionalizantes/ofertas'
        });
    });
});

// GET - Muestra un pedido
router.get('/practicas-profesionalizantes/pedidos/:requestID', (req, res) => {
    Practice.findById(req.params.requestID, (err, practice) => {
        if (err || !practice) return res.redirect('practicas-profesionalizantes/pedidos');

        res.render('./sections/practicas-profesionalizantes/request', {
            request: practice,
            backUrl: '/practicas-profesionalizantes/pedidos'
        });
    });
});

// POST - Envía una solicitud de contacto de una oferta, redirecciona a una página de éxito
router.post('/practicas-profesionalizantes/ofertas/:offerID/contacto', (req, res) => {
    // TODO: add email logic
    let offerID = req.params.offerID;
    res.redirect('/practicas-profesionalizantes/ofertas/' + offerID + '/contacto-exito');
});

// POST - Envía una solicitud de contacto de un pedido, redirecciona a una página de éxito
router.post('/practicas-profesionalizantes/pedidos/:requestID/contacto', (req, res) => {
    // TODO: add email logic
    let requestID = req.params.requestID;
    res.redirect('/practicas-profesionalizantes/pedidos/' + requestID + '/contacto-exito');
});

// GET - Muestra un mensaje indicando que la solicitud de contacto de una oferta fue envíada
router.get('/practicas-profesionalizantes/ofertas/:offerID/contacto-exito', (req, res) => {
    Practice.findById(req.params.offerID, (err, practice) => {
        if (err || !practice) return res.redirect('/practicas-profesionalizantes/ofertas');

        res.render('./sections/practicas-profesionalizantes/success', {
            practice: practice,
            backUrl: '/practicas-profesionalizantes/ofertas/' + practice._id
        });
    });
});

// GET - Muestra un mensaje indicando que la solicitud de contacto de un pedido fue envíada
router.get('/practicas-profesionalizantes/pedidos/:requestID/contacto-exito', (req, res) => {
    Practice.findById(req.params.offerID, (err, practice) => {
        if (err || !practice) return res.redirect('/practicas-profesionalizantes/pedidos');

        res.render('./sections/practicas-profesionalizantes/success', {
            practice: practice,
            backUrl: '/practicas-profesionalizantes/pedidos/' + practice._id
        });
    });
});

module.exports = router;