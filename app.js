const express = require('express');
// import express from 'express'
var morgan = require('morgan');
// import morgan from 'morgan';
var cors = require('cors');
// import cors from 'cors';
var mongoose = require('mongoose');
// import mongoose from 'mongoose';
const router = require('./routes');

// *****
import path from 'path';


//CONEXION BD
mongoose.Promise = global.Promise;
//const mongoose = require('mongoose');
//const uri = 'mongodb://localhost:27017/myapp';
const uri = 'mongodb+srv://octopus:x3e2qAA2FvJ3c2EE@octopusservices.58doo.mongodb.net/myapp?retryWrites=true&w=majority';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
//or using promises
mongoose.connect(uri, options).then(    
    () => { console.log('Conectado a BD') } , // ready to use. the 'mongoose.connect()' promise to mongoose instance.    
    err => { console.log(err) }
); 
    
const app = express();
//MIDDLEWARE
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import router from './routes';
//const router = require('./routes/index');
//ROUTE

app.use('/api', router);
/*
app.use('/api', require('./routes/especialidad'));
app.use('/api', require('./routes/servicio'));
app.use('/api', require('./routes/usuario'));
*/
//app.use('/api', require('./routes/nota'));
/*app.get('/', (req, res) => {
    res.send('Hello wordl :(!!');
});*/

//Middleware para Vue.js rouyter modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));


app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function() {
    console.log('Ejemplo app listening on port '+ app.get('puerto'));
    
});