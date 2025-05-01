const db = require('../database');

// save Employee
async function saveEmployee(employee) {
    try{
        //console.log(employee)
        const cleanedEmployeeNumber = employee.employee_number?.replace(/\D/g, '') || '';
        const cleanedGrossSalary = employee.gross_salary?.replace(/\D/g, '') || '';

    const sql = `
      INSERT INTO employees_table 
        (employee_number, first_name, last_name, salutation, employee_gender, gross_salary, employee_profile_color)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        salutation = VALUES(salutation),
        employee_gender = VALUES(employee_gender),
        gross_salary = VALUES(gross_salary),
        employee_profile_color = VALUES(employee_profile_color)
    `;

    const params = [
      cleanedEmployeeNumber,         // employee_number
      employee.first_name,          // first_name
      employee.last_name,           // last_name
      employee.salutation,          // salutation
      employee.employee_gender,     // employee_gender
      cleanedGrossSalary,          // gross_salary
      employee.employee_profile_color // employee_profile_color
    ];
        const result = await db.query(sql, params);
        return true;
    }catch(err){
        if(err.code=='ER_DUP_ENTRY'){
            console.log('its a duplicate error ***************')
            console.log(err)

        }
        return false;
    }
}

async function getEmployees(){
    try {
        const results = await db.query('SELECT * FROM employees_table');
        return results;
      } catch (error) {
        //console.log(error)
        return { error: 'Failed to fetch employees' }
      }
   

}

module.exports = { saveEmployee, getEmployees  };