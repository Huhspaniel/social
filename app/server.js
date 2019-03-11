const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
const db = require('./db');
const app = require('./app.js');

db.sync().then(function(val) {
    app.listen(PORT, HOST, function startServer() {
        console.log(`App listening on port ${PORT}`);
    });
})