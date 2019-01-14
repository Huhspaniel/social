module.exports = function (sequelize, { STRING }) {
    return sequelize.define('posts', {
        title: {
            type: STRING,
            trim: true,
            allowNull: false,
        },
        content: {
            type: STRING,
            trim: true,
            allowNull: false
        }
    })
}