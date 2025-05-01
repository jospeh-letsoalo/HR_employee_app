
const mysql = require('mysql');
//this is for xampp mysql
/*const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',                // Replace with your MySQL username
  password: '',   // Replace with your MySQL password
  database: 'hico_assessment'  // Make sure this DB exists
});*/

// MySQL Connection Pool
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'hico_assessment',
  port: 3307
});



/*connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});*/
 function initDB() {
  try{
     connection.getConnection((err, connection) => {
      if (err) throw err;
      console.log('Connected to MySQL');
    
      const createTableSQL = `
         CREATE TABLE IF NOT EXISTS employees_table (
            id  INT AUTO_INCREMENT PRIMARY KEY,
            employee_number DECIMAL(20, 0) UNIQUE NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            salutation VARCHAR(20) NOT NULL,
            employee_gender VARCHAR(20) NOT NULL,
            gross_salary DECIMAL(50, 0),
            employee_profile_color VARCHAR(20) 
          );
      `;
    
      connection.query(createTableSQL, (error, results) => {
          if (error) throw error;
          console.log('Employees table ensured.');
          connection.release();
      });
    }); 
  }catch(err){
    console.error('Error initializing database:', error);
  }
 
}

/*async function initDB() {
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS employees_table (
        id  INT AUTO_INCREMENT PRIMARY KEY,
        employee_number DECIMAL(20, 0) UNIQUE NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        salutation VARCHAR(20) NOT NULL,
        employee_gender VARCHAR(20) NOT NULL,
        gross_salary DECIMAL(50, 0),
        employee_profile_color VARCHAR(20) 
      );
    `);
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}
*/
function query(sql, params) {
    return new Promise((resolve, reject) => {
      connection.getConnection((err, connection) => {
        connection.query(sql, params, (error, results) => {
          if (error) {
            console.error('Database query error:', error.message);
            connection.release();
            reject(error);
          } else {
            connection.release();
            resolve(results);
          }
        });
      })

    });
  }

module.exports = { query,initDB };