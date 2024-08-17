const express = require('express')
const PORT = 3001;
const app = express()
const path = require('path')
const publicPath = path.resolve(__dirname, './public');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const mainRoutes = require('./routes/mainRoutes');



// Configurar Pug como motor de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(publicPath));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));



app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto '+ PORT + `. URL: http://localhost:${PORT}`);
});

app.use('/', mainRoutes)