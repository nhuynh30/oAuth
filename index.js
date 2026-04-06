const express = require('express');
const app = express();
require('dotenv').config();

require('./auth');

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/protect', (req, res) => {
    res.send('Hello');
});




app.listen(3000);