//Dependencies
const express = require('express'); // Y
const connectDB = require('./config/db'); // Y
const mongoose = require('mongoose');
const passport = require('passport');
// const path = require('path');

// const search = require('./routes/api/search');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Connect Database
connectDB(); // Y

const PORT = process.env.PORT || 2187; // Y

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Config
const db = require('./config/keys').mongoURI;

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport.js')(passport);

// Use Routes
// app.use('/api/search', search);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Serve Static Assets if in Production
if (process.env.NODE_ENV === 'production') {
  // Set Static Folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () =>
  console.log(`Vegetabelly server running on port ${PORT}`)
); // Y
