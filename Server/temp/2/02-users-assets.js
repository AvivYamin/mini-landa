const { Sequelize, DataTypes } = require('sequelize');
const c = require('../../Utils/Helpers/coloredLogs');

//Add related collums in singlw to many relationship.
//According to the revised Models.
//Drop added rows on migration rollBack.

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('users_assets', 
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notEmpty: true,   
            references: { model: 'users', key: 'id' }
        },
        asset_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notEmpty: true, 
            references: { model: 'assets', key: 'id' }  
        },
        shares_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notEmpty: true, 
            defaultValue: 0
        }
      })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('users_assets')
    },
  }

