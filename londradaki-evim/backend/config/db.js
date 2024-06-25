const mysql = require('mysql2');

const dbConfig = {
  host: '92.205.0.157',
  user: 'OFCADMIN',
  password: 'aA103091992OFCADMIN',
  database: 'EMLAK_DB'
};

const connectDB = () => {
  const connection = mysql.createConnection(dbConfig);
  connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err.message);
      return;
    }
    console.log('MySQL connected');
  });
  return connection;
};

module.exports = connectDB;
