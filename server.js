// Dependencies
const express = require('express');
const mongoose = require('mongoose');

const search = require('./routes/api/search');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('x'));

// Use Routes
app.use('/api/search', search);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 2187;

app.listen(port, () =>
  console.log(`Vegetabelly server running on port ${port}`)
);
