const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function binarySearch(list, val, compare) {
    compare = compare || function (val, x) {
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

const parseAuth = req => {
    if (req.headers.authorization) {
        const auth = req.headers.authorization.split(' ');
        if (auth[0] === 'Bearer' && auth[1]) {
            return auth[1];
        }
    }
}

const authJwt = (req, res, next) => {
    req.bearer = parseAuth(req);
    let error;
    if (req.bearer) {
        const decoded = jwt.verify(req.bearer, process.env.JWT_KEY);
        if (decoded) {
            req.body.user_id = decoded.sub;
            req.body.token = decoded;
            return next();
        } else {
            error = 'Invalid Token'
        }
    } else {
        error = 'Please Pass Bearer Token';
    }

    res.status(401).json({ error });
}

module.exports = function (app) {
    app.post('/api/login', async (req, res) => {
        console.log(req.body);
        try {
            const user = await db.users.find({ where: { username: req.body.username } });
            if (!user) return res.status(404).json({ error: 'User Not Found' });
            const isValid = await bcrypt.compare(req.body.password, user.password);

            if (isValid) {
                const token = jwt.sign({
                    iss: 'huhspaniel.com',
                    sub: user.id,
                    exp: Math.round(Date.now() / 1000) + 172800
                }, process.env.JWT_KEY);
                res.json({ token, username: user.username, id: user.id });
            } else {
                return res.status(401).json({ error: 'Invalid Username/Password' });
            }
        } catch (err) {
            res.status(400).send({
                error: `${err.name} - ${err.message}`,
                stack: err.stack.split('\n')
            });
        }
    })
    app.route('/api/users')
        .get(async (req, res) => {
            try {
                const users = await db.models.users.findAll({
                    attributes: {
                        exclude: ['password', 'email', 'updated_at', 'created_at'],
                        include: [['created_at', 'joinDate']]
                    }
                });

                res.json(users);
            } catch (err) {
                res.status(400).json({ error: `${err.name} - ${err.message}` });
            }
        })
        .post(async (req, res) => {
            try {
                const dbRes = await db.users.create(req.body);

                res.json(dbRes)
            } catch (err) {
                res.status(400).json(err);
            }
        })
    app.route('/api/posts')
        .get(async (req, res) => {
            try {
                const posts = await db.posts.findAll({
                    include: [{
                        model: db.users,
                        attributes: ['id', 'firstname', 'lastname', 'username', ['created_at', 'joinDate']]
                    }, {
                        model: db.votes
                    }]
                });

                res.json(posts);
            } catch (err) {
                res.status(400).json(err);
            }
        })
        .post(authJwt, async (req, res) => {
            try {
                const dbRes = await db.posts.create(req.body);

                res.json(dbRes);
            } catch (err) {
                res.status(400).json(err);
            }
        })
    app.post('/api/votes', authJwt, async (req, res) => {
        const { user_id, post_id, val } = req.body
        try {
            const result = await db.votes.upsert({ user_id, post_id, val }, { returning: true });
            res.json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    })
}