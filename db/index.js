const Sequelize = require('sequelize');
const db = new Sequelize(process.env.PSQL_URI, require('./config.json'));
const path = require('path');

const users = db.import(path.join(__dirname, 'users.js'));
const posts = db.import(path.join(__dirname, 'posts.js'));
const upvotes = db.define('upvotes', {});
const downvotes = db.define('downvotes', {});

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
        upvotes,
        downvotes,
        posts
    ],
    foreignKey: 'user_id'
}, {
    parent: posts,
    children: [
        upvotes,
        downvotes
    ],
    foreignKey: 'post_id'
}])

const models = { users, posts, upvotes, downvotes };

for (let prop in models) {
    db[prop] = models[prop];
}
db.Sequelize = Sequelize;

module.exports = db;