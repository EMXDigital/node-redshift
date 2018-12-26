const Redshift = require('../index.js');
const JSONStream = require('JSONStream'); //make sure to run: npm install JSONStream,  before running test;
const redshiftConfig = {
  host: 'someHost',
  user: 'someUser',
  password: 'superSecret',
  database: 'someDb',
  port: 5439
};
const redshiftClient = new Redshift(redshiftConfig);
const query = `SELECT * FROM redshift_table_data`;

redshiftClient.stream(query, null, {batchSize: 20})
.then(stream => {
  stream.on('end', () => {
    console.log('Finished streaming data');
    process.exit();
  })
  // start consuming stream
  stream.pipe(JSONStream.stringify()).pipe(process.stdout)
})
.catch(console.error)
