const bcrypt = require('bcrypt');

module.exports = function (sequelize, { STRING }) {
    return sequelize.define('users', {
        email: {
            type: 'citext',
            trim: true,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Email is invalid'
                }
            }
        },
        password: {
            type: STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).*/,
                    msg: 'Password must contain at least one lowercase letter, one uppercase letter, and one number'
                },
                len: {
                    args: [8],
                    msg: 'Password must be at least 8 characters long'
                }
            }
        },
        username: {
            type: 'citext',
            allowNull: false,
            unique: true,
            validate: {
                is: {
                    args: /^[a-z0-9_]*$/i,
                    msg: 'Username can only contain letters, numbers, and _'
                }
            }
        },
        firstname: {
            type: STRING,
            trim: true,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        lastname: {
            type: STRING,
            trim: true,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    }, {
        getterMethods: {
            name() {
                return this.firstname + ' ' + this.lastname;
            }
        },
        setterMethods: {
            name(val) {
                if (typeof val === 'string') {
                    const names = val.split(' ');
    
                    this.setDataValue('firstname', names.slice(0, -1).join(' '));
                    this.setDataValue('lastname', names.slice(-1).join(' '));
                }
            }
        },
        hooks: {
            async afterValidate(user, options) {
                try {
                    user.password = await bcrypt.hash(user.password, 10);
                } catch (err) {
                    user.invalidate('password', 'Password encryption failed')
                }
            }
        }
    });
}