//Dependencies
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

const search = require('./routes/api/search');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

const PORT = process.env.PORT || 2187;

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
app.use('/api/search', search);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Serve Static Assets if in Production
if (process.env.NODE_ENV === 'production') {
  // Set Static Folder
  app.use(express.static('client/build'));

  // req is grayed out ///////////////////////////////////////////////////////////////////////////////////////////////////
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () =>
  console.log(`Vegetabelly server running on port ${PORT}`)
);
