//Models' main export file
//Defines the connection between tables

const Asset = require ('./Asset');
const User = require ('./User');
const Share = require('./Share')
const Transaction = require('./Transaction')

//User.hasMany(Blog);
//Blog.belongsTo(User);
//User.sync({ alter: true });
//Blog.sync({ alter: true });

//User.belongsToMany(ReadingList, { through: UsersRl })
//ReadingList.belongsToMany(User, { through: UsersRl })
//Blog.belongsToMany(ReadingList, { through: BlogsRl })
//ReadingList.belongsToMany(Blog, { through: BlogsRl })


module.exports = {
    Asset,
    User,
    Share,
    Transaction,
};