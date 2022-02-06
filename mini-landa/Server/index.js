const app = require('./Utils/app');
const { PORT } = require('./Utils/Config');
const DB = require('./Utils/config/DB');
const c = require('./Utils/Helpers/coloredLogs');

//Connects the App and the DB
(async () => {
  await DB.connect();
  app.listen(PORT, () => {
    console.log(`${c.s.s}app started on port:${PORT}${c.s.e}`);
  });
})();