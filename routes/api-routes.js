const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function binarySearch(list, val, compare) {
    compare = compare || function(val, x) {
        if (val < x) return -1;
        else if (val > x) return 1;
        else return 0;
    }
    let start, end, i, comparison, res;
    start = 0;
    end = list.length - 1;
    while (end - start > 0) {
        i = Math.trunc((start + end) / 2);
        comparison = compare(val, list[i]);
        if (comparison > 0) {
            start = i;
        } else if (comparison < 0) {
            end = i;
        } else {
            res = i;
            break;
        }
    }
    return res;
}

function dbBinarySearch(rows, id) {
    return binarySearch(rows, id, function compare(id, row) {
        if (id < row.id) return -1;
        else if (id > row.id) return 1;
        else return 0;
    });
}

function authJWT(req, res, next) {
    const auth = req.headers.authorization.split(' ');
    if (auth[0] === 'Bearer' && auth[1]) {
        const decoded = jwt.verify(auth[1], process.env.JWT_KEY);
        if (decoded) {
            req.body.user_id = decoded.sub;
            req.body.token = decoded;
            next();
        } else {
            req.body = undefined;
            next(new Error('Invalid token'))
        }
    } else {
        req.body = undefined;
        res.status(403).send(new Error('Invalid authorization. Must follow Bearer schema.'))
    }
}

module.exports = function (app) {
    app.post('/api/login', async (req, res) => {
        try {
            const user = await db.users.find({ where: { username: req.body.username } });
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
                const users = await db.models.users.findAll({
                    attributes: { exclude: ['password'] }
                });

                res.json(users);
            } catch (err) {
                res.status(500).send(err);
            }
        })
        .post(async (req, res) => {
            try {
                const dbRes = await db.users.create(req.body);

                res.json(dbRes)
            } catch (err) {
                res.status(500).send(err);
            }
        })
    app.route('/api/posts')
        .get(async (req, res) => {
            try {
                const posts = await db.posts.findAll({});

                res.json(posts);
            } catch (err) {
                res.status(500).send(err);
            }
        })
        .post(authJWT, async (req, res) => {
            try {
                const dbRes = await db.posts.create(req.body);

                res.json(dbRes);
            } catch (err) {
                res.status(500).send(err);
            }
        })
    app.post('/api/votes', authJWT, async (req, res) => {
        const { user_id, post_id, val } = req.body
        try {
            const result = await db.votes.upsert({ user_id, post_id, val }, { returning: true });
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: {
                name: err.name,
                message: err.message,
                stack: err.stack.split('\n')
            }});
        }
    })
}