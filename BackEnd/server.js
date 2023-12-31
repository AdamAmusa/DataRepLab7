//Server Logic -> Backend
const express = require('express')
const app = express()
const port = 4000;
const cors = require('cors');


//allows control access to server
app.use(cors());
app.use(function (req, res, next) {
    //response headers that will print out onto the page
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Middleware to parse incoming request bodies
const bodyParser = require('body-parser');
// Parse URL-encoded data and populate the req.body object
app.use(bodyParser.urlencoded({ extended: false }));
// Parse JSON data and populate the req.body object
app.use(bodyParser.json());


// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.ey2zjid.mongodb.net/DB14?retryWrites=true&w=majority');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//defines objects for the book collection
const bookSchema = new mongoose.Schema({
    title: String,
    cover: String,
    author: String
})

//confirms which database you would like the collection to be in
const bookModel = mongoose.model('my_books22', bookSchema);

//root page prints out hello world
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//page displays data received
app.post('/api/book', (req, res) => {
    console.log(req.body);

    //Creates new book in the database using data from the create page
    bookModel.create({
        title: req.body.title,
        cover: req.body.cover,
        author: req.body.author
    })
        .then(()=>{res.send("Book Created")})
        .catch(()=>{res.send("Book NOT Created")});

})

//submitted data on the create webpage is sent to the books webpage as json data
app.get('/api/books', async(req, res) => {
    let books = await bookModel.find({});
    res.json(books);
})


//search book with ID
app.get('/api/book/:identifier', async(req,res)=>{
    console.log(req.params.identifier);

    let book = await bookModel.findById(req.params.identifier);
    res.send(book);
})

//port listener
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

