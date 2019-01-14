const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DB_URI, require('./config.json'));
const path = require('path');

const users = db.import(path.join(__dirname, 'users.js'));
const posts = db.import(path.join(__dirname, 'posts.js'));
const upvotes = db.define('upvotes', {});
const downvotes = db.define('downvotes', {});

// set table associations
users.hasMany(upvotes, { foreignKey: 'user_id' });
users.hasMany(downvotes, { foreignKey: 'user_id' });
users.hasMany(posts, { foreignKey: 'user_id' });

posts.belongsTo(users, { foreignKey: 'user_id' });
posts.hasMany(upvotes, { foreignKey: 'post_id' });
posts.hasMany(downvotes, { foreignKey: 'post_id' });

upvotes.belongsTo(users, { foreignKey: 'user_id' });
upvotes.belongsTo(posts, { foreignKey: 'post_id' });
downvotes.belongsTo(users, { foreignKey: 'user_id' });
downvotes.belongsTo(posts, { foreignKey: 'post_id' });

const models = { users, posts, upvotes, downvotes };

for (let prop in models) {
    db[prop] = models[prop];
}
db.Sequelize = Sequelize;

module.exports = db;