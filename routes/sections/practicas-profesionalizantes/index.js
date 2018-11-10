'use strict';

const express                               = include('express'),
      moment                                = include('moment'),
      Practice                              = include('models/practice');

const router = express.Router();

const practiceTypes = {Offer: 'offer', Request: 'request'};

moment.locale('es');

router.get('/practicas-profesionalizantes', (req, res) => {
    res.render('./sections/practicas-profesionalizantes', {backUrl: '/'});
});

router.get('/practicas-profesionalizantes/ofertas', (req, res) => {
    Practice.find({type: practiceTypes.Offer}, (err, practices) => {
        if (err) return res.redirect('/practicas-profesionalizantes');

        res.render('./sections/practicas-profesionalizantes/offers', {
            practices: practices,
            backUrl: '/practicas-profesionalizantes'
        });
    });
});

router.get('/practicas-profesionalizantes/pedidos', (req, res) => {
    Practice.find({type: practiceTypes.Request}, (err, practices) => {
        if (err) return res.redirect('/practicas-profesionalizantes');

        res.render('./sections/practicas-profesionalizantes/requests', {
            practices: practices,
            backUrl: '/practicas-profesionalizantes'
        });
    });
});

router.get('/practicas-profesionalizantes/ofertas/nuevo', (req, res) => {
    res.render('./sections/practicas-profesionalizantes/newOffer', {
        backUrl: '/practicas-profesionalizantes/ofertas'
    });
});

router.get('/practicas-profesionalizantes/pedidos/nuevo', (req, res) => {
    res.render('./sections/practicas-profesionalizantes/newRequest', {
        backUrl: '/practicas-profesionalizantes/pedidos'
    });
});

router.post('/practicas-profesionalizantes/ofertas/nuevo', (req, res) => {
    Practice.create(req.body.practice, (err, practice) => {
        if (err) return res.redirect('/practicas-profesionalizantes/ofertas/nuevo');

        // add extra data to the new practice and save
        practice.date = moment().format('ll');
        practice.type = practiceTypes.Offer;
        practice.save();

        res.redirect('/practicas-profesionalizantes/ofertas/' + practice._id + '/nuevo-exito');
    });
});

router.post('/practicas-profesionalizantes/pedidos/nuevo', (req, res) => {
    Practice.create(req.body.practice, (err, practice) => {
        if (err) return res.redirect('/practicas-profesionalizantes/pedidos/nuevo');

        // add extra data to the new practice and save
        practice.date = moment().format('ll');
        practice.type = practiceTypes.Request;
        practice.level = 'Cualquier nivel educativo';
        practice.save();

        res.redirect('/practicas-profesionalizantes/pedidos/' + practice._id  + '/nuevo-exito');
    });
});

router.get('/practicas-profesionalizantes/ofertas/:offerID/nuevo-exito', (req, res) => {
    res.render('./sections/practicas-profesionalizantes/offerSuccess', {
        offerID: req.params.offerID, 
        backUrl: '/practicas-profesionalizantes/ofertas'
    });
});

router.get('/practicas-profesionalizantes/pedidos/:requestID/nuevo-exito', (req, res) => {
    res.render('./sections/practicas-profesionalizantes/requestSuccess', {
        requestID: req.params.requestID,
        backUrl: '/practicas-profesionalizantes/pedidos'
    });
});

router.get('/practicas-profesionalizantes/ofertas/:offerID', (req, res) => {
    Practice.findById(req.params.offerID, (err, practice) => {
        if (err || !practice) return res.redirect('practicas-profesionalizantes/ofertas');

        res.render('./sections/practicas-profesionalizantes/offer', {
            offer: practice,
            backUrl: '/practicas-profesionalizantes/ofertas'
        });
    });
});

router.get('/practicas-profesionalizantes/pedidos/:requestID', (req, res) => {
    Practice.findById(req.params.requestID, (err, practice) => {
        if (err || !practice) return res.redirect('practicas-profesionalizantes/pedidos');

        res.render('./sections/practicas-profesionalizantes/request', {
            request: practice,
            backUrl: '/practicas-profesionalizantes/pedidos'
        });
    });
});

router.post('/practicas-profesionalizantes/ofertas/:offerID/contacto', (req, res) => {
    // TODO: add email logic
    let offerID = req.params.offerID;
    res.redirect('/practicas-profesionalizantes/ofertas/' + offerID + '/contacto-exito');
});

router.post('/practicas-profesionalizantes/pedidos/:requestID/contacto', (req, res) => {
    // TODO: add email logic
    let requestID = req.params.requestID;
    res.redirect('/practicas-profesionalizantes/pedidos/' + requestID + '/contacto-exito');
});

router.get('/practicas-profesionalizantes/ofertas/:offerID/contacto-exito', (req, res) => {
    Practice.findById(req.params.offerID, (err, practice) => {
        if (err || !practice) return res.redirect('/practicas-profesionalizantes/ofertas');

        res.render('./sections/practicas-profesionalizantes/success', {
            practice: practice,
            backUrl: '/practicas-profesionalizantes/ofertas/' + practice._id
        });
    });
});

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