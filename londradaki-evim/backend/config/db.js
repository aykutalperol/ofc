const mysql = require('mysql2/promise');

const dbConfig = {
  host: '92.205.0.157',
  user: 'OFCADMIN',
  password: 'aA103091992OFCADMIN',
  database: 'EMLAK_DB'
};

const pool = mysql.createPool(dbConfig);

const connectDB = async () => {
  try {
    await pool.getConnection();
    console.log('MySQL connectedddd');
    return pool;
  } catch (err) {
    console.error('Error connecting to MySQL:', err.message);
    throw err;
  }
};

module.exports = connectDB;
