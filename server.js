let express = require('express');
const createError = require('http-errors');
path = require('path');
mongoose = require('mongoose');
cors = require('cors');
bodyparser = require('body-parser');
dbConfig = require('./db/database');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(()=> {
    console.log('Manga Database Connected!')
},
error => {
    console.log('Database could not be connect try again later. : ' + error)
}
)

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));

app.use(cors());

const userRoute = require('./routes/manga.routes')

app.use('/endpoint', userRoute);

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log('Port Connected to: ' + port)
})

app.use((req, res, next) => {
    next(createError(404));
});

app.get('/', (req, res) => {
    res.send('invalid endpoint');
});

app.use(function (err, req, res, next) {
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})