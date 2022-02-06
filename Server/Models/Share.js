const sequelize = require('../Utils/Config/DB');
const { Model, DataTypes } = require('sequelize');

class Share extends Model {}

Share.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    /*
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' },
    },
    asset: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'asset', key: 'id' },
    },
    */
  },
  {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'share'
  }
);


module.exports = Share;


