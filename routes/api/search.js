// Check if this route is needed for this app

const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({ msg: 'Search Page Works' }));

module.exports = router;
