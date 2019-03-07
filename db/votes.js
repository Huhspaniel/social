module.exports = function (sequelize, types) {
    const votes = sequelize.define('votes', {
        user_id: {
            type: 'integer',
            unique: 'vote'
        },
        post_id: {
            type: 'integer',
            unique: 'vote'
        },
        val: {
            type: 'integer',
            validate: {
                min: -1,
                max: 1
            }
        }
    })
    
    return votes;
}