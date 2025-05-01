const mysql = require('mysql2');

// Create connection pool
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin', // Update if needed
  database: 'hico_assessment',
  port: 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize database and create table if not exists
function initDB() {
  try {
    connection.getConnection((err, conn) => {
      if (err) {
        console.error('Failed to get MySQL connection:', err.stack);
        return;
      }

      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS employees_table (
          id INT AUTO_INCREMENT PRIMARY KEY,
          employee_number DECIMAL(20, 0) UNIQUE NOT NULL,
          first_name VARCHAR(100) NOT NULL,
          last_name VARCHAR(100) NOT NULL,
          salutation VARCHAR(20) NOT NULL,
          employee_gender VARCHAR(20) NOT NULL,
          gross_salary DECIMAL(50, 0),
          employee_profile_color VARCHAR(20)
        );
      `;

      conn.query(createTableSQL, (error, results) => {
        if (error) {
          console.error('Error creating table:', error.message);
        } else {
          console.log('Employees table ensured.');
        }
        conn.release();
      });
    });
  } catch (err) {
    console.error('Database initialization failed:', err.message);
  }
}

// Query helper function
function query(sql, params) {
  return new Promise((resolve, reject) => {
    connection.getConnection((err, conn) => {
      if (err) {
        console.error('Failed to get connection:', err);
        return reject(err);
      }

      conn.query(sql, params, (error, results) => {
        if (error) {
          console.error('Database query error:', error.message);
          conn.release();
          return reject(error);
        }

        conn.release();
        resolve(results);
      });
    });
  });
}

module.exports = { query, initDB };