const sequelize = require('../Utils/Config/DB');
const { Model, DataTypes } = require('sequelize');

class User extends Model {}

User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "UserName must be a valid Email-Address"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null
    },
  },{
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user',
})

module.exports = User;