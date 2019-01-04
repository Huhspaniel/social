const express = require('express');
const path = require('path');
const app = express();
const PROD = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 8080;
if (PROD) {
    app.use(express.static(path.join(__dirname, 'client/dist')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(PORT, function startServer() {
    console.log(`App listening on port ${PORT}`);
});