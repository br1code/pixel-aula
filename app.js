'use strict';

const express               = require('express');

// Routes
const indexRoutes           = require('./routes/index');
const inicialRoutes         = require('./routes/sections/inicial');
const primarioRoutes        = require('./routes/sections/primario');
const tecnicoRoutes         = require('./routes/sections/tecnico');
const superiorRoutes        = require('./routes/sections/superior');

const PORT = process.env.PORT || 3000;

const app = express();

// CONFIG -----------------------------------------------

// MongoDB configuration

// Express configuration
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Custom middlewares configuration


// Routes configuration
app.use(indexRoutes);
app.use(inicialRoutes);
app.use(primarioRoutes);
app.use(tecnicoRoutes);
app.use(superiorRoutes);

// Handling missed/wrong page
app.get('*', (req, res) => {
    res.redirect('/');
});

// Server listening
app.listen(PORT, () => {
    console.log('Server listening at port: ' + PORT);
});