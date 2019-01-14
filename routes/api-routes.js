const db = require('../db');

module.exports = function (app) {
    app.route('/api/users')
        .get(async (req, res) => {
            try {
                const users = await db.models.users.find({});

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