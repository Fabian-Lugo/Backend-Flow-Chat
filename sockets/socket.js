const {io} = require('../index');
const Book = require('../models/book');
const Books = require('../models/books');

const books = new Books();
console.log('-- Server Iniciado --');

books.addBook(new Book('Padre rico Padre pobre'));
books.addBook(new Book('Los secretos de la mete millonaria'));
books.addBook(new Book('Habitos atomicos'));
books.addBook(new Book('No me puedes lastimar'));

//Mensajes de sockets
io.on('connection', client => {
  console.log('Cliente conectado')
  
  client.on('disconnect', () => {
    console.log('Cliente desconectado')
  });
  
  
  client.emit('active-books', books.getBooks());

  client.on('vote-book', (data) => {
    books.voteBook(data.id)
    io.emit('active-books', books.getBooks());
  })

  client.on('add-book', (data) => {
    const newBook = new Book(data.name);
    books.addBook(newBook);
    io.emit('active-books', books.getBooks());
  })

  client.on('delete-book', (data) => {
    books.deleteBook(data.id); 
    io.emit('active-books', books.getBooks());
  })

});