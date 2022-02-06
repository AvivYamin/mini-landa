const { Sequelize, DataTypes } = require('sequelize');
const c = require('../Utils/Helpers/coloredLogs');

//Add related collums in single to many relationship.
//According to the revised Models.
//Drop added rows on migration rollBack.

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('shares', 'asset_id', 
        {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'assets', key: 'id' },
        })
        await queryInterface.addColumn('transactions', 'user_id', 
        {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
        })
        await queryInterface.addColumn('transactions', 'asset_id', 
        {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'assets', key: 'id' },
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('shares', 'asset_id')
        await queryInterface.removeColumn('transactions', 'user_id')
        await queryInterface.removeColumn('transactions', 'asset_id')
    },
  }

