const User = require('../../models/user');

const User_Const = Object.assign((data) => {
    return User.build(data);
}, User);

module.exports = Model = {
    User,
    User_Const,
}