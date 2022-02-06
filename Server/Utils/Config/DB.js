const { DATABASE_URL } = require('./index');
const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const c = require('../Helpers/coloredLogs');

//Sequelize Configurations
module.exports = sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

//Migrations configurations
const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

//Runs the migration according to the configuration and files from Migrations directory 
const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log(`${c.p.s} Migrations up to date ${c.p.e}`, {
    files: migrations.map((mig) => mig.name)
  })
}

//Authenticates, executes available migrations and connects the database 
module.exports.connect = async function(){
    try {
      await sequelize.authenticate();
      await runMigrations();
      console.log(`${c.s.s} Database connected successfully on port:5432. ${c.s.e}`);
    } catch (error) {
      console.log(`${c.f.s} Database connection failed: ${error}${c.f.s}`);
      return process.exit(1);
    }
    return null;
};

//Retrive cahnges from current migration
module.exports.rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}
