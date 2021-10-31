// const express = require('express');
// const router = express.Router();
// const {Book} = require('../models');
// const fileMiddleware = require('../middleware/file');
// const stor = {
//     books: [],
// };

// [1, 2, 3].map(el => {
//     const newBook = new Book(`book ${el}`, `desc book ${el}`);
//     stor.books.push(newBook);
// });

// router.get('/', (req, res) => {
//     const {books} = stor;
//     res.render("book/index", {
//         title: "Book",
//         books: books,
//     });
// });

// router.get('/create', (req, res) => {
//     res.render("book/create", {
//         title: "Book | create",
//         books: {},
//     });
// });

// router.post('/create', (req, res) => {
//     const {books} = stor;
//     const {title, desc, authors, favorite, fileCover} = req.body;

//     const newBook = new Book(title, desc, authors, favorite, fileCover);
//     books.push(newBook);

//     res.redirect('/book')
// });

// router.get('/:id', (req, res) => {
//     const {books} = stor;
//     const {id} = req.params;
//     const idx = books.findIndex(el => el.id === id);

//     if (idx !== -1) {
//         res.render("book/view", {
//             title: "Book | view",
//             books: books[idx],
//         });
//     } else {
//         res.status(404).redirect('/404');
//     }
// });

// router.get('/update/:id', (req, res) => {
//     const {books} = stor;
//     const {id} = req.params;
//     const idx = books.findIndex(el => el.id === id);

//     if (idx !== -1) {
//         res.render("book/update", {
//             title: "Book | update",
//             books: books[idx],
//         });
//     } else {
//         res.status(404).redirect('/404');
//     }
// });

// router.post('/update/:id', (req, res) => {
//     const {books} = stor;
//     const {id} = req.params;
//     const {title, desc, authors, favorite, fileCover} = req.body;
//     const idx = books.findIndex(el => el.id === id);

//     if (idx !== -1) {
//         books[idx] = {
//             ...books[idx],
//             title,
//             desc,
//             authors,
//             favorite,
//             fileCover
//         };
//         res.redirect(`/book/${id}`);
//     } else {
//         res.status(404).redirect('/404');
//     }
// });

// router.post('/delete/:id', (req, res) => {
//     const {books} = stor;
//     const {id} = req.params;
//     const idx = books.findIndex(el => el.id === id);

//     if (idx !== -1) {
//         books.splice(idx, 1);
//         res.redirect(`/book`);
//     } else {
//         res.status(404).redirect('/404');
//     }
// });

// module.exports = router;   

const express = require('express');
const router = express.Router();
const Book = require('../models/Book');


router.get('/', async (req, res) => {
    const book = await Book.find();
    res.render("book/index", {
        title: "Book",
        book: book,
    });
});

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Book | create",
        book: {},
    });
});

router.post('/create', async (req, res) => {
    const {id, title, desc, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book({
        id, title, desc, authors, favorite, fileCover, fileName
    });

    try {
        await newBook.save();
        res.redirect('/book');
    } catch (e) {
        console.error(e);
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let book;

    try {
        book = await Book.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.render("book/view", {
        title: "Book | view",
        book: book,
    });
});

router.get('/update/:id', async (req, res) => {
    const {id} = req.params;
    let book;
    try {
        book = await Book.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.render("book/update", {
        title: "Book | view",
        book: book,
    });
});

router.post('/update/:id', async (req, res) => {
    const {id} = req.params;
    const {title, desc, authors, favorite, fileCover, fileName} = req.body;

    try {
        await Book.findByIdAndUpdate(id, {title, desc, authors, favorite, fileCover, fileName});
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.redirect(`/book/${id}`);
});

router.post('/delete/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Book.deleteOne({_id: id});
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.redirect(`/book`);
});

module.exports = router;