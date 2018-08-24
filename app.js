'use strict';

const express                               = require('express'),
    mongoose                                = require('mongoose');


// Routes
const indexRoutes                           = require('./routes/index');
const inicialPrimarioRoutes                 = require('./routes/sections/inicial-primario');
const secundarioTecnicoRoutes               = require('./routes/sections/secundario-tecnico');
const terciarioUniversitarioRoutes          = require('./routes/sections/terciario-universitario');
const practicasProfesionalizantesRoutes     = require('./routes/sections/practicas-profesionalizantes');

const PORT = process.env.PORT || 3000;

const app = express();

// CONFIG -----------------------------------------------

// MongoDB configuration
mongoose.connect('mongodb://localhost/pixelaula', { useNewUrlParser: true});

// Express configuration
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Custom middlewares configuration


// Routes configuration
app.use(indexRoutes);
app.use(inicialPrimarioRoutes);
app.use(secundarioTecnicoRoutes);
app.use(terciarioUniversitarioRoutes);
app.use(practicasProfesionalizantesRoutes);

// Handling missed/wrong page
app.get('*', (req, res) => {
    res.redirect('/');
});

// Server listening
app.listen(PORT, () => {
    console.log('Server listening at port: ' + PORT);
});