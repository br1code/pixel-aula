'use strict';

const express                               = require('express'),
    bodyParser                              = require("body-parser"),
    mongoose                                = require('mongoose');


// Routes
const indexRoutes                           = require('./routes/index');
const inicialPrimarioRoutes                 = require('./routes/sections/inicial-primario');
const secundarioTecnicoRoutes               = require('./routes/sections/secundario-tecnico');
const practicasProfesionalizantesRoutes     = require('./routes/sections/practicas-profesionalizantes');
const foroRoutes                            = require('./routes/sections/foro');
const pruebasRoutes                         = require('./routes/sections/pruebas');

const PORT = process.env.PORT || 3000;

const app = express();

// CONFIG -----------------------------------------------

// MongoDB configuration
// mongoose.connect('mongodb://localhost/pixelaula', { useNewUrlParser: true});
mongoose.connect('mongodb://pixel-aula-dev:justfordevelopment18@ds151402.mlab.com:51402/pixelaula-dev', { useNewUrlParser: true});

// Express configuration
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

// Custom middlewares configuration


// Routes configuration
app.use(indexRoutes);
app.use(inicialPrimarioRoutes);
app.use(secundarioTecnicoRoutes);
app.use(practicasProfesionalizantesRoutes);
app.use(foroRoutes);
// app.use(pruebasRoutes);

// Handling missed/wrong page
app.get('*', (req, res) => {
    res.render('error', {backUrl: '/'});
});

// Server listening
app.listen(PORT, () => {
    console.log('Server listening at port: ' + PORT);
});