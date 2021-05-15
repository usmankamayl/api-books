const express = require('express');
const bodyParser = require("body-parser");
const errorMiddleware = require('./middleware/error');
const indexRouter = require('./routes/index');
const bookApiRouter = require('./routes/api/book');
const bookRouter = require('./routes/book');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.use('/public', express.static(__dirname+"/public"));
app.use('/', indexRouter);
app.use('/book', bookRouter);
app.use('/api/book', bookApiRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`=== start server PORT ${PORT} ===`);
});   