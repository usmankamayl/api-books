const express = require('express');
const cors = require('cors');
const formData = require("express-form-data");
const randomId = require('node-random-id');

const {Book, User} = require('./models');
const stor = {
  users: [],
  books: []
};

[1, 2, 3].map(el => {
  const newBook = new Book( `title ${el}`, `desc book ${el}`, `authors ${el}`, `favorite ${el}`, `fileCover ${el}`, `fileName ${el}`);
  stor.books.push(newBook);
});

const app = express();

app.use(formData.parse());
app.use(cors());

app.post('/api/user/login', (reg, res) => {
  const {users} = stor;
  const {id, mail} = reg.body;
  const newUser = new User(id, mail);
  users.push(newUser);
  res.status(201);
  res.json(newUser);
})

app.get('/api/books/', (req, res) => {
  const {books} = stor;
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const {books} = stor;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
      res.json(books[idx]);
  } else {
      res.status(404);
      res.json("books | not found");
  }
});

app.post('/api/books/', (req, res) => {
  const {books} = stor;
  const {title, desc, authors, favorite, fileCover, fileName} = req.body;

  const newBook = new Book(title, desc, authors, favorite, fileCover, fileName);
  books.push(newBook);

  res.status(201);
  res.json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const {books} = stor;
  const {title, desc, authors, favorite, fileCover, fileName} = req.body;
  const {id} = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    books[idx] = {
          ...books[idx],
          id,
          title,
          desc,
          authors,
          favorite,
          fileCover,
          fileName
      };
      res.json(books[idx]);
  } else {
      res.status(404);
      res.json("books | not found");
  }
});

app.delete('/api/books/:id', (req, res) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
