const morgan = require('morgan');
const express = require('express');
const cors = require('cors');

const app = express();

const {mongoose} = require('./database');
// configuracion servidor
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));


//rutas del servidor
app.use('/api/empleados',require('./routers/empleados.routers'));

//empezando el servidor
app.listen(app.get('port'), ()=>{
console.log('Servidor en puerto', app.get('port'));
});