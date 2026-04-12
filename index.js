const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

//Db config
require('./database/config').dbConnection();

// App express
const app = express();

// Lectura y parseo del body
app.use(express.json());

// CORS
app.use(cors());


//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
require('./sockets/socket');

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//Mis rutas
app.use('/auth', require('./routes/auth'));

server.listen(process.env.PORT, (error) => {
  if (error) throw new Error(error);
  console.log('Servidor corriendo en puerto', process.env.PORT);
});