const sequelize = require('../Utils/Config/DB');
const { Model, DataTypes } = require('sequelize');

class Transaction extends Model {}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    //Bid = True; Ask = False;
    type: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    //Price Per Share
    pps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quatity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' },
    }
  },
  {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'transaction'
  }
);


module.exports = Transaction;


