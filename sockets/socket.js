const {io} = require('../index');

//Mensajes de sockets
io.on('connection', client => {
  console.log('Cliente conectado')

  client.on('disconnect', () => {
    console.log('Cliente desconectado')
  });

  client.on('message', (payload) => {
    console.log('Message!!', payload);  

    io.emit('mensaje', {admin: 'Nuevo mensaje'});
  })
});