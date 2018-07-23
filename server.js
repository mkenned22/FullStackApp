const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const booksController = require("./controllers/booksController")
const app = express();
const PORT = process.env.PORT || 3001;
//var book = require('./routes/book');
const auth = require('./controllers/auth');

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
//app.use('/api/book', book);
app.use('/api/auth', auth);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mern-secure",
  { 
    useMongoClient: true
  }
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
