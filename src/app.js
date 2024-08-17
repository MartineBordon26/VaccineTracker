const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const bodyParser = require('body-parser');

const mainRoutes = require('./routes/mainRoutes');
const vaccineRoutes = require('./routes/vaccineRoutes')


const PORT = 3001;

const app = express()
const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));

// Motor de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto '+ PORT + `. URL: http://localhost:${PORT}`);
});

app.use('/', mainRoutes)
app.use('/vaccine', vaccineRoutes)
