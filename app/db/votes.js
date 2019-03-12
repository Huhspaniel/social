module.exports = function (sequelize, types) {
    const votes = sequelize.define('votes', {
        user_id: {
            type: 'integer',
            unique: 'vote',
            allowNull: false
        },
        post_id: {
            type: 'integer',
            unique: 'vote',
            allowNull: false
        },
        val: {
            type: 'integer',
            validate: {
                min: -1,
                max: 1
            },
            allowNull: false
        }
    })
    
    return votes;
}