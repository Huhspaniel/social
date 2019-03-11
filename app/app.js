const express = require('express');
const path = require('path');
const app = express();
const PROD = process.env.NODE_ENV === 'production';

if (PROD) {
    app.use(express.static(path.join(__dirname, '../client/dist/social')));
}
app.use(express.json());
require('./routes/api-routes')(app);
if (PROD) {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/social/index.html'));
    });
}
module.exports = app;