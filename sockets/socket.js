const {io} = require('../index');

console.log('-- Server Iniciado --');

//Mensajes de sockets
io.on('connection', client => {
  console.log('Cliente conectado')
  
  client.on('disconnect', () => {
    console.log('Cliente desconectado')
  });

});