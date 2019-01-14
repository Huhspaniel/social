require('./.env.js');
const express = require('express');
const path = require('path');
const app = express();
const PROD = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 8080;
const db = require('./db');
if (PROD) {
    app.use(express.static(path.join(__dirname, 'client/dist')));
}
app.use(express.json());
require('./routes/api-routes')(app);
if (PROD) {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/dist/index.html'));
    });
}

db.sync().then(function(val) {
    app.listen(PORT, function startServer() {
        console.log(`App listening on port ${PORT}`);
    });
})