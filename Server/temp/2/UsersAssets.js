const sequelize = require('../../Utils/Config/DB');
const { Model, DataTypes } = require('sequelize');

class UsersAssets extends Model {}

UsersAssets.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true,   
      references: { model: 'users', key: 'id' }
    },
    assetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true, 
      references: { model: 'assets', key: 'id' }  
    },
    sharesQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true, 
      defaultValue: 0
    },
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'users_assets'
    }
);


module.exports = UsersAssets;


