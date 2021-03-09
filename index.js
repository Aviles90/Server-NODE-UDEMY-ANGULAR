const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./db/config')
require('dotenv').config();

//crear el servidor de express
const app = express();

//BASE DE DATOS
dbConnection();

//DIRECTORIO PUBLICO
app.use(express.static('public'));

//CORS
app.use( cors() );

// LECTURTA Y PARSEO DEL BODY
app.use( express.json() );

//Rutas
app.use( '/api/auth', require('./routes/auth') )

app.listen( process.env.PORT, () =>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})