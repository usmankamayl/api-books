const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>Index<h1>').json('I dont now');
});

module.exports = router;