const express = require('express');
const router = express.Router();
const {Book} = require('../models');
const fileMiddleware = require('../middleware/file');
const stor = {
    books: [],
};

[1, 2, 3].map(el => {
    const newBook = new Book(`book ${el}`, `desc book ${el}`);
    stor.books.push(newBook);
});

router.get('/', (req, res) => {
    const {books} = stor;
    res.render("book/index", {
        title: "Book",
        books: books,
    });
});

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Book | create",
        books: {},
    });
});

router.post('/create', (req, res) => {
    const {books} = stor;
    const {title, desc} = req.body;

    const newBook = new Book(title, desc);
    books.push(newBook);

    res.redirect('/book')
});

router.get('/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("book/view", {
            title: "Book | view",
            books: books[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.get('/update/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("book/update", {
            title: "Book | view",
            books: books[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const {title, desc} = req.body;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            desc,
        };
        res.redirect(`/book/${id}`);
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.redirect(`/book`);
    } else {
        res.status(404).redirect('/404');
    }
});

module.exports = router;  