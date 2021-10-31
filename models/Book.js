// const uidGenerator = require('node-random-id');

// class Book {
//     constructor(title = "", desc = "", authors = "", favorite = "", fileCover = "", fileName = "", fileBook = "", id = uidGenerator.ranid()) {
//         this.title = title;
//         this.desc = desc;
//         this.authors = authors;
//         this.favorite = favorite;
//         this.fileCover = fileCover;
//         this.fileName = fileName;  
//         this.fileBook = fileBook;
//         this.id = id; 
//     }
// }

// module.exports = Book;

const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        default: "",
    },

    authors: {
        type: String,
        default: "",
    },
    favorite: {
        type: String,
        default: "",
    },
    fileCover: {
        type: String,
        default: "", 
    },
    
    fileName: {
        type: String,
        default: ""
    },

    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = model('Book', bookSchema);