const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');


const app = express();

//cargar rutas
const user_routes = require('./routes/usuario.routes');
const establecimiento_routes = require('./routes/establecimiento.routes');

const {mongoose} = require('./database');
// configuracion servidor
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));


//rutas del servidor
//app.use('/api/empleados',require('./routers/empleados.routers'));
app.use('/api',user_routes);
app.use('/api',establecimiento_routes);

//empezando el servidor
app.listen(app.get('port'), ()=>{
console.log('Servidor en puerto', app.get('port'));
});