const Book = require("./book");

class Books {
    constructor() {
        this.books = [];
    };

    addBook(book = new Book()) {
      this.books.push(book);
    };

    getBooks() {
        return this.books;
    }

    deleteBook(id = '') {
        this.books = this.books.filter(book => book.id !== id);
        return this.books;
    };

    voteBook(id = '') {
        this.books = this.books.map(book => {
          if(book.id === id) {
            book.votes++;
            return book;
          } else {
            return book;
          }
        });
    };
}

module.exports = Books