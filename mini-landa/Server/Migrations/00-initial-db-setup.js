const { Sequelize, DataTypes } = require('sequelize');
const c = require('../Utils/Helpers/coloredLogs');

//Setup 4 tables migration : assets, users, shares & transactions.
//According to the existing Models.
//Drop all tables on migration rollBack.

module.exports = {
    up: async ({ context: queryInterface }) => {
        console.log(`${c.s.s} HEY ${c.s.e}`)
      await queryInterface.createTable('assets', 
      {
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
          defaultValue: false,
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
          defaultValue: 1000
        },
        available_shares: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1000,
          validate: {
              max: { 
                args: [1000],
                msg: "Shares must be less than 1,000"
              },
              min: {
                args: [0],
                msg: "Shares must be at least 0"
                }
          } 
        } 
      })
      await queryInterface.createTable('users', 
      {
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
        }
      })
      await queryInterface.createTable('transactions',
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        pps: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quatity: {
              type: DataTypes.INTEGER,
              allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
      })
      await queryInterface.createTable('shares',
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
      })
    },
    down: async ({ context: queryInterface }) => {
      await queryInterface.dropTable('shares')
      await queryInterface.dropTable('assets')
      await queryInterface.dropTable('transactions')
      await queryInterface.dropTable('users')
    },
}

  /*
  shares-
          owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        }
        asset: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'assets', key: 'id' },
        }
  transactions - 
          owner: {
              type: DataTypes.INTEGER,
              allowNull: false,
              references: { model: 'users', key: 'id' },
        },
  */