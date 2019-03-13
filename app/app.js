const express = require('express');
const path = require('path');
const app = express();
const PROD = process.env.NODE_ENV === 'production';

const parseAuth = (req, res, next) => {
    if (req.headers.authorization) {
        const auth = req.headers.authorization.split(' ');
        if (auth[0] === 'Bearer' && auth[1]) {
            req.bearer = auth[1];
        }
    }
    next();
}

if (PROD) {
    app.use(express.static(path.join(__dirname, '../client/dist/social')));
}
app.use(express.json());
app.use(parseAuth);
require('./routes/api-routes')(app);
if (PROD) {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/social/index.html'));
    });
}
module.exports = app;