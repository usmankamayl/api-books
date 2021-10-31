const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const errorMiddleware = require('./middleware/error');
const indexRouter = require('./routes/index');
const bookApiRouter = require('./routes/api/book');
const bookRouter = require('./routes/book');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.use('/public', express.static(__dirname+"/public"));
app.use('/', indexRouter);
app.use('/book', bookRouter);
app.use('/api/book', bookApiRouter);

app.use(errorMiddleware);


const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'books'
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/'
async function start() {
    try {
        //const UrlDB = `mongodb+srv://${UserDB}:${PasswordDB}@cluster0.grfrs.mongodb.net/${NameDB}`;
        //const UrlDB = `mongodb://localhost:27017/mydb`;
        //const UrlDB = `mongodb://${UserDB}:${PasswordDB}@localhost:27017/mydb`;
        //await mongoose.connect(UrlDb);
        
        await mongoose.connect(HostDb, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}


start();