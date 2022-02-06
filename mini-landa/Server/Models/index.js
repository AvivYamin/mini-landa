//Models' main export file
//Defines the connection between tables

const Asset = require ('./Asset');
const User = require ('./User');
const Share = require('./Share')
const Transaction = require('./Transaction')

User.hasMany(Share);
Share.belongsTo(User);
User.hasMany(Transaction);
Transaction.belongsTo(User);
Asset.hasMany(Share);
Share.belongsTo(Asset);


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