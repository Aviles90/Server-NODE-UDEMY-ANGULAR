const express = require('express');
const cors = require('cors');
require('dotenv').config();

//crear el servidor de express
const app = express();

//CORS
app.use( cors() );

// LECTURTA Y PARSEO DEL BODY
app.use( express.json() );

//Rutas
app.use( '/api/auth', require('./routes/auth') )

app.listen( process.env.PORT, () =>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})