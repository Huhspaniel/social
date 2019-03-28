module.exports = function (sequelize, { STRING }) {
    return sequelize.define('posts', {
        title: {
            type: STRING,
            trim: true,
            allowNull: false,
            validate: {
                len: [2, 70]
            }
        },
        content: {
            type: STRING,
            trim: true,
            allowNull: false,
            validate: {
                len: [0, 1000]
            }
        }
    }, {})
}