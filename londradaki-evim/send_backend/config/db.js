const mysql = require('mysql2/promise');

const dbConfig = {
  host: '92.205.0.157',
  user: 'OFCADMIN',
  password: 'aA103091992OFCADMIN',
  database: 'EMLAK_DB'
};

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('MySQL connectedddd');
    return connection;
  } catch (err) {
    console.error('Error connecting to MySQL:', err.message);
    throw err;
  }
};

module.exports = connectDB;
