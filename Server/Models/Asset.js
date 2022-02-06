const sequelize = require('../Utils/Config/DB');
const { Model, DataTypes } = require('sequelize');

class Asset extends Model {}

Asset.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,   
      unique: true
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1000,
      validate: {
        max: { 
          args: [1000000],
          msg: "Cost must be less then 1,000,000$"
        },
        min: {
          args: [1000],
          msg: "Cost must be more than 1000$"
          },
       }
    },
    shares: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10000
    },
    availableShares: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10000,
        validate: {
            max: { 
              args: [10000],
              msg: "Shares must be less than 10,000"
            },
            min: {
              args: [0],
              msg: "Shares must be at least 0"
              }
        }
    }
  },
  {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'asset'
  }
);


module.exports = Asset;


