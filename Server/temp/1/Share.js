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
    assetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'assets', key: 'id' },
    },
  },
  {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'share'
  }
);


module.exports = Share;


