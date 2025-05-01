import React, { useState, useEffect } from 'react';
import './style.css'
import axios from 'axios';
import { Button, Container,Form, Row, Col } from 'react-bootstrap';
import EmployeeDetails from './employeeDetails';

const Employees = ({ shortUrl }) => {
    const [employees,setEmployees] = useState([])
    const [viewEmployee,setViewEmployee] = useState(false)
    const [employeeObj,setEmployeeObj] = useState({})

  useEffect(() => {
    //console.log(shortUrl)
    getEmployees()
  
  }, [viewEmployee]);
  const getEmployees= async()=>{
    try {
      
       const response = await axios.get(`http://localhost:1234/api/getEmployees`); // for development
        //const response = await axios.get(`/api/shorten/${shortCode}/stats`); // for deployment
        //console.log(response.data)
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
  }
  const profileColors = {
    Green: { backgroundColor: '#00BB77', color: 'white' },
    Blue: { backgroundColor: '#366899', color: 'white' },
    Red: { backgroundColor: '#ED2100', color: 'white' },
    default: { backgroundColor: 'lightgray', color: 'black' }
  };
  const getRowStyle = (color) => {
    return profileColors[color] || profileColors.default;
  };

  return (
    <>
        <Container className="mt-5 text-center d-flex flex-column align-items-center" style= {{ maxWidth: '85%' }} >
            <div className='employee-header'>
                <h4>Current Employees</h4>
                <Button size='sm' id='add-employee' onClick={()=>setViewEmployee(true)}>Add Employees</Button>
            </div> 
        <table className="table table-sm table-hover" >
            <thead>
                <tr>
                    <th>
                        Employee #
                    </th>
                    <th>
                        First Name
                    </th>
                    <th>
                        Last Name
                    </th>
                    <th>
                        Salutation
                    </th>
                    <th>
                        Profile Colour
                    </th>
                </tr>
            </thead>
            {JSON.stringify(employees)!='{}'&&<>
            <tbody>
            {employees.map((emp)=>{
                return (
                <tr style={{
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }} key={emp.id} onClick={()=>{setViewEmployee(true);setEmployeeObj(emp);}}>
                    <td style={getRowStyle(emp.employee_profile_color)}> {emp.employee_number}</td>
                    <td style={getRowStyle(emp.employee_profile_color)}> 
                    {emp.first_name}
                    </td>
                    <td style={getRowStyle(emp.employee_profile_color)}>{emp.last_name}</td>
                    <td style={getRowStyle(emp.employee_profile_color)}> 
                    {emp.salutation}
                    </td>
                    <td style={getRowStyle(emp.employee_profile_color)}>{emp.employee_profile_color}</td>
                </tr>
                )
            })}
            </tbody>
            
            
            </>}
        </table>
        
        
        </Container>
        {viewEmployee &&<>
            <EmployeeDetails employeeObj={employeeObj} setViewEmployee={setViewEmployee} setEmployeeObj={setEmployeeObj}/>
        </>}
        

    </>
  );
};

export default Employees;