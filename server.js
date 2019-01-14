const PORT = process.env.PORT || 8080;
const db = require('./db');
const app = require('./app.js');

db.sync().then(function(val) {
    app.listen(PORT, function startServer() {
        console.log(`App listening on port ${PORT}`);
    });
})