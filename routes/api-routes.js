const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function authJWT(req, res, next) {
    const auth = req.headers.authorization.split(' ');
    if (auth[0] === 'Bearer' && auth[1]) {
        const verified = jwt.verify(auth[1], process.env.JWT_KEY);
        if (verified) {
            next();
        } else {
            next(new Error('Invalid token'))
        }
    } else {
        next(new Error('Invalid authorization. Must follow Bearer schema.'))
    }
}

module.exports = function (app) {
    app.post('/api/login', async (req, res) => {
        try {
            const user = await db.users.find({ username: req.body.username });
            const isValid = await bcrypt.compare(req.body.password, user.password);

            if (isValid) {
                const token = jwt.sign({
                    iss: 'huhspaniel.com',
                    sub: user.id,
                    exp: Math.round(Date.now() / 1000) + 172800
                }, process.env.JWT_KEY);
                res.json({ token });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    })
    app.route('/api/users')
        .get(async (req, res) => {
            try {
                const users = await db.models.users.findAll({});

                res.json(users);
            } catch (err) {
                res.status(500).send(err);
            }
        })
        .post(async (req, res) => {
            try {
                const dbRes = await db.models.users.create(req.body);

                res.json(dbRes)
            } catch (err) {
                res.status(500).send(err);
            }
        })
}