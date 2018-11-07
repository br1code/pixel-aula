'use strict';

const utils                                 = require('./logic/utils');

// The 'include' function is set globally for use it with the root directory.
utils.setGlobalInclude(__dirname);

const express                               = include('express'),
      bodyParser                            = include('body-parser'),
      mongoose                              = include('mongoose');

const indexRoutes                           = include('routes/index'),
      inicialPrimarioRoutes                 = include('routes/sections/inicial-primario'),
      secundarioTecnicoRoutes               = include('routes/sections/secundario-tecnico'),
      practicasProfesionalizantesRoutes     = include('routes/sections/practicas-profesionalizantes'),
      foroRoutes                            = include('routes/sections/foro');

const PORT                                  = process.env.PORT || 3000,
      DB_URL                                = process.env.DB_URL || utils.getDBLocalURL();

// MongoDB config
mongoose.connect(DB_URL, { useNewUrlParser: true});

const app = express();

// Express config
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

// Routes config
app.use(indexRoutes);
app.use(inicialPrimarioRoutes);
app.use(secundarioTecnicoRoutes);
app.use(practicasProfesionalizantesRoutes);
app.use(foroRoutes);

// Handling missed/wrong page
app.get('*', (req, res) => {
    res.render('error', {backUrl: '/'});
});

// Server listening
app.listen(PORT, () => {
    console.log('Server listening at port: ' + PORT);
});

utils.keepServerAlive();