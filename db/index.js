const Sequelize = require('sequelize');
const db = new Sequelize(process.env.PSQL_URI, require('./config.json'));
const path = require('path');

const users = db.import(path.join(__dirname, 'users.js'));
const posts = db.import(path.join(__dirname, 'posts.js'));
const votes = db.define('votes', {
    user_id: {
        type: 'integer',
        unique: 'upvote'
    },
    post_id: {
        type: 'integer',
        unique: 'upvote'
    },
    val: {
        type: 'integer',
        validate: {
            min: -1,
            max: 1
        }
    }
});

// set table associations
function oneToMany(associations) {
    associations.forEach(({ parent, children, foreignKey }) => {
        foreignKey = {
            name: foreignKey,
            allowNull: false
        }
        children.forEach((child => {
            parent.hasMany(child, { foreignKey });
            child.belongsTo(parent, { foreignKey });
        }))
    })
}

oneToMany([{
    parent: users,
    children: [
        votes,
        posts
    ],
    foreignKey: 'user_id'
}, {
    parent: posts,
    children: [
        votes
    ],
    foreignKey: 'post_id'
}])

const models = { users, posts, votes };

for (let prop in models) {
    db[prop] = models[prop];
}
db.Sequelize = Sequelize;

module.exports = db;