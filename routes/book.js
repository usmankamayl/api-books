const express = require('express');
const router = express.Router();
const {Book} = require('../models');
const fileMiddleware = require('../middleware/file');
console.log(fileMiddleware);
const stor = {
    books: [123],
};

[1, 2, 3].map(el => {
    const newBook = new Book(`book ${el}`, `desc book ${el}`);
    stor.books.push(newBook);
});

router.get('/', (req, res) => {
    const {books} = stor;
    res.json(books);
});

router.get('/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.post('/', (req, res) => {
    const {books} = stor;
    const {title, desc, authors, favorite, fileCover, fileName, fileBook} = req.body;

    const newBook = new Book(title, desc, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

router.put('/:id', (req, res) => {
  const {books} = stor;
  const {title, desc, authors, favorite, fileCover, fileName, fileBook} = req.body;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    books[idx] = {
          ...books[idx],
          title,
          desc,
          authors,
          favorite,
          fileCover,
          fileName,
          fileBook
      };
      res.json(books[idx]);
  } else {
      res.status(404);
      res.json("books | not found");
  }
});

router.delete('/:id', (req, res) => {
  const {books} = stor;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
      res.json(true);
  } else {
      res.status(404);
      res.json("books | not found");
  }
});

// загрузка файлов
router.post('/upload-book', fileMiddleware.single('book'), (req, res) => {
    if (req.file) {
        const {path} = req.file;
        console.log(path);

        res.json(path);
    } else {
        res.json(null);
    }
});

router.get('/:id/download-book', (req, res) => {
    res.download(__dirname+'/../public/books/book1.txt', 'book.txt', err=>{
        if (err){
            res.status(404).json();
        }
    });
});

module.exports = router; 