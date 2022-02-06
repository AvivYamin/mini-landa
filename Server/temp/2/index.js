//Models' main export file
//Defines the connection between tables

const Asset = require ('../2/UsersAssets');
const User = require ('./User');
const Share = require('./Share')
const Transaction = require('./Transaction')
const UsersAssets = require('./UsersAssets')

//Single To Many
Asset.hasMany(Share);
Share.belongsTo(Asset);
Asset.hasMany(Transaction);
Transaction.belongsTo(Asset);
User.hasMany(Transaction);
Transaction.belongsTo(User);

//Many To Many
Asset.belongsToMany(User, { through: UsersAssets })
User.belongsToMany(Asset, { through: UsersAssets })

module.exports = {
    Asset,
    User,
    Share,
    Transaction,
};