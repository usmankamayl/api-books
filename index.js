const express = require('express');
const bodyParser = require("body-parser");
const formData = require("express-form-data");
const cors = require('cors');
const loggerMiddleware = require('./middleware/logger');``
const errorMiddleware = require('./middleware/error');
const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const app = express();
app.use(formData.parse());
app.use(bodyParser());
app.use(cors());

app.use('/public', express.static(__dirname+"/public"));

app.use('/', indexRouter);
app.use('/api/book', bookRouter);
app.use(errorMiddleware);

app.listen(3000); 