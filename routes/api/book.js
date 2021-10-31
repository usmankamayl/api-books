// const express = require('express');
// const router = express.Router();
// const {Book} = require('../../models');
// const fileMiddleware = require('../../middleware/file');

// const stor = {
//     books: [],
// };

// [1, 2, 3].map(el => {
//     const newBook = new Book(`book ${el}`, `desc book ${el}`);
//     stor.books.push(newBook);
// });

// router.get('/', (req, res) => {
//     const {books} = stor;
//     res.json(books);
// });

// router.get('/:id', (req, res) => {
//     const {books} = stor;
//     const {id} = req.params;
//     const idx = books.findIndex(el => el.id === id);

//     if (idx !== -1) {
//         res.json(books[idx]);
//     } else {
//         res.status(404);
//         res.json("book | not found");
//     }
// });

// router.post('/', fileMiddleware.single('book'), (req, res) => {
//     if (req.file) {
//         const {path} = req.file;
//         const {books} = stor;
//         const {title, desc, authors, favorite, fileCover, fileName, fileBook}  = req.body;
//         const newBook= new Book(title, desc, authors, favorite, fileCover, 'book', `${path}`);
//         books.push(newBook);
//         res.json(newBook);
//     } else {
//         res.json(null);
//     }
// });

// router.put('/:id', (req, res) => {
//     const {books} = stor;
//     const {title, desc, authors, favorite, fileCover, fileName, fileBook} = req.body;
//     const {id} = req.params;
//     const idx = books.findIndex(el => el.id === id);

//     if (idx !== -1) {
//         books[idx] = {
//             ...books[idx],
//             title,
//             desc,
//             authors,
//             favorite,
//             fileCover,
//             fileName,
//         };
//         res.json(books[idx]);
//     } else {
//         res.status(404);
//         res.json("book | not found");
//     }
// }); 

// router.delete('/:id', (req, res) => {
//     const {books} = stor;
//     const {id} = req.params;
//     const idx = books.findIndex(el => el.id === id);

//     if (idx !== -1) {
//         books.splice(idx, 1);
//         res.json(true);
//     } else {
//         res.status(404);
//         res.json("book | not found");
//     }
// });

// router.get('/:id/download-book', (req, res) => {
//     const {books} = stor;
//     const {fileBook, fileName}  = {books};
//     const {id} = req.params;
//     const idx = books.findIndex(el => el.id === id);
//     if (idx !== -1) {
//         res.download(`${books[idx].fileBook}`, `${fileName}`, err=>{
//             if (err){
//                 res.status(404).json();
//             }
//         });
//     } 
   
// });

// module.exports = router;    

const express = require('express');
const router = express.Router();
const Todo = require('../../models/Book');

router.get('/', async (req, res) => {
    const book = await Book.find().select('-__v');
    res.json(book);
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const book = await Book.findById(id).select('-__v');
        res.json(book);
    } catch (e) {
        console.error(e);
        res.status(404).json("book | not found");
    }
});

router.post('/', async (req, res) => {
    const {title, desc} = req.body;

    const newBook = new Book({
        title: 'title...',
        desc: 'desc...',
    });

    try {
        await newBook.save();
        res.json(newBook);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {title, desc} = req.body;

    try {
        await Book.findByIdAndUpdate(id, {title, desc});
        res.redirect(`/api/book/${id}`);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Book.deleteOne({_id: id});
        res.json(true);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

module.exports = router;