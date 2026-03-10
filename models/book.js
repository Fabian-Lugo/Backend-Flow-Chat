const {v4: uuidv4} = require('uuid');

class Book {
    constructor(name = 'no-name') {
      this.id = uuidv4(); //Identificador único
      this.name = name;
      this.votes = 0;
    };
}

module.exports = Book;