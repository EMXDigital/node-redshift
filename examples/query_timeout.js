const Redshift = require('../index.js');
const redshiftConfig = {
  host: 'someHosy',
  user: 'someUser',
  password: 'superSecret',
  database: 'someDb',
  port: 5439
};

const redshiftClient = new Redshift(redshiftConfig, {maxQueryTimeout:5000});
const query = `SELECT * from some_table`;

redshiftClient.query(query)
.then(console.log)
.catch(console.error)
