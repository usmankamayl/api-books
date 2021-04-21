const uidGenerator = require('node-random-id');

class Book {
    constructor(title = "", desc = "", authors = "", favorite = "", fileCover = "", fileName = "", fileBook = "", id = uidGenerator.ranid()) {
        this.title = title;
        this.desc = desc;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;  
        this.fileBook = fileBook;
        this.id = id; 
    }
}

module.exports = Book;