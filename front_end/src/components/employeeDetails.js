import React, { useState, useEffect } from 'react';
import './style.css'
import axios from 'axios';
import { Button, Container,Form, Row, Col } from 'react-bootstrap';

const EmployeeDetails = (props) => {

  const [salary, setSalary] = useState('');
  const [employeeNo, setEmployeeNo] = useState('');
  const [name,setName] = useState('')
  const [lastname,setLastName] = useState('')
  const [salutation,setSalutation] = useState('')
  const [gender,setGender] = useState('')
  const [color,setColor] = useState('Default')
  const [nameErr,setNameErr] = useState(false)
  const [lastErr,setLastErr] = useState(false)
  const [salErr,setSalErr] = useState(false)
  const [empErr,setEmpErr] = useState(false)

  useEffect(() => {
    if(JSON.stringify(props.employeeObj)!=='{}'){
        console.log(props.employeeObj)
        handleChangeSalary(props.employeeObj.gross_salary.toString())
        handleChangeEmployee(props.employeeObj.employee_number.toString())
        setName(props.employeeObj.first_name)
        setLastName(props.employeeObj.last_name)
        setSalutation(props.employeeObj.salutation)
        setGender(props.employeeObj.employee_gender)
        setColor(props.employeeObj.employee_profile_color)
    }
 
  }, [props.employeeObj]);
  const saveEmployee= async ()=>{
    let employee = {
        first_name:name,
        last_name:lastname,
        salutation:salutation,
        employee_gender:gender,
        gross_salary:salary,
        employee_profile_color:color,
        employee_number:employeeNo
    }

   // console.log(employee)
    try {
          await axios.post('http://localhost:1234/api/saveEmployee', { employee: employee });// for development
          //const response = await axios.post('/api/saveEmployee', { employee: employee });// for deployment
         props.setViewEmployee(false)
        
      } catch (error) {
        //console.error('Error while saving employee:', error);
      }

  }
  const handleChangeText = (value,type) => {
    
    // Allow only letters and spaces
    const filteredValue = value.replace(/[^a-zA-Z ]/g, '');
    if(type==='name'){
        setName(filteredValue)
        if(filteredValue===''){
            setNameErr(true)
        }else{
            setNameErr(false)
        }
    }if(type==='last'){
        setLastName(filteredValue)
        if(filteredValue===''){
            setLastErr(true)
        }else{
            setLastErr(false)
        }
    }
  };
  
  const handleChangeSalary = (value) => {
    
    // Remove all non-digit characters
    let digitsOnly = value.replace(/\D/g, '');

    // Format with spaces every 3 digits
    let formatted = '';
    while (digitsOnly.length > 3) {
      formatted = ' ' + digitsOnly.slice(-3) + formatted;
      digitsOnly = digitsOnly.slice(0, -3);
    }
    formatted = digitsOnly + formatted;

    setSalary(formatted);
  };
  
  const handleChangeEmployee = (value) => {
    // Remove all non-digit characters
    let digitsOnly = value.replace(/\D/g, '');
    if(digitsOnly===''){
        setEmpErr(true)
    }else{
        setEmpErr(false)
    }

    setEmployeeNo(digitsOnly);
  };
  const handleChangeSelect=(e)=>{
   const selectedValue = e.target.value;
    setSalutation(selectedValue);
    if(selectedValue==='Mr.'){
        setSalErr(false)
        setGender('Male')
    }else if(selectedValue==='Mrs.' || selectedValue==='Ms.'){
        setSalErr(false)
        setGender('Female')
    }else if(selectedValue==='Mx.' || selectedValue==='Dr.'){
        setSalErr(false)
        setGender('Unspecified')
    }
    else{
        setGender('')
        setSalErr(true)
    }
  }
 
  return (
    <>
   
        <Container>
            <div id='employee-information'>
                <h4>Employee Information</h4>
                <div id='save-employee'> <Button size='sm' variant="outline-secondary" onClick={()=>{props.setViewEmployee(false);props.setEmployeeObj({})}}>Cancel</Button> <Button size='sm' variant='outline-primary' onClick={saveEmployee}> Save</Button></div>
               <Form className="text-start" >
                <Row>
                    <Form.Group as={Col}  className="mb-2">
                        <Form.Group as={Row}  >
                            <Form.Label  column sm={4}>
                            First Name(s) *
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" placeholder="Full Name" value={name} onChange={(e)=>handleChangeText(e.target.value,'name')}/>
                                    {nameErr&&<>
                                        <span className='error-message'>Field Required</span>
                                    </>}
                            </Col>
                        </Form.Group>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-2">
                        <Form.Group as={Row} >
                            <Form.Label column sm={4}>
                            Full Name
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control disabled type="text" value={`${name} ${lastname}`}/>
                            </Col>
                        </Form.Group>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-2">
                        <Form.Group as={Row}  >
                            <Form.Label  column sm={4}>
                            Last Name *
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" placeholder="Last Name" value={lastname} onChange={(e)=>handleChangeText(e.target.value,'last')}/>
                                {lastErr&&<>
                                        <span className='error-message'>Field Required</span>
                                    </>}
                            </Col>
                        </Form.Group>
                    </Form.Group>

                    <Form.Group as={Col}  className="mb-2">
                        <Form.Group as={Row} >
                            <Form.Label column sm={4}>
                            Gross Salary $PY
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" onChange={(e)=>handleChangeSalary(e.target.value)} value={salary} className="text-end"/>
                            </Col>
                        </Form.Group>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} className="mb-2">
                        <Form.Group as={Row}  >
                            <Form.Label column sm={4}>
                            Salutation *
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Select aria-label="Salutation" value={salutation} onChange={handleChangeSelect}>
                                <option vlaue=''> Select Field</option>
                                <option vlaue='Dr.'> Dr</option>
                                <option value="Mr.">Mr</option>
                                <option value="Ms.">Ms</option>
                                <option value="Mrs.">Mrs</option>
                                <option value="Mx.">Mx</option>
                            </Form.Select>
                                {salErr&&<>
                                    <span className='error-message'>Field Required</span>
                                </>}
                            </Col>
                        </Form.Group>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-2">
                        <Form.Group as={Row} >
                            <Form.Label column sm={4}>
                            Employee Profile Colour
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Check
                                inline
                                label="Green"
                                type="checkbox"
                                value="Green"
                                checked={color==='Green'}
                                onChange={(e) => setColor(e.target.value)}
                            />

                            <Form.Check
                                inline
                                label="Blue"
                                type="checkbox"
                                value="Blue"
                                checked={color==='Blue'}
                                onChange={(e) => setColor(e.target.value)}
                            />
                            <Form.Check
                                inline
                                label="Red"
                                type="checkbox"
                                value="Red"
                                checked={color==='Red'}
                                onChange={(e) => setColor(e.target.value)}
                            />
                            <Form.Check
                                inline
                                label="Default"
                                type="checkbox"
                                value="Default"
                                onChange={(e) => setColor(e.target.value)}
                                checked={color==='Default'}

                            />
                            </Col>
                        </Form.Group>
                    </Form.Group>
                </Row>
                <Row >
                <Form.Group as={Col} className="mb-2">
                        <Form.Group as={Row} >
                            <Form.Label column sm={4}>
                            Gender *
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Check
                                inline
                                label="Male"
                                type="radio"
                                checked={gender === 'Male'}
                                name="gender"
                                value="Male"
                                readOnly
                            />
                            <Form.Check
                                inline
                                label="Female"
                                type="radio"
                                name="gender"
                                checked={gender === 'Female'}
                                value="Female"
                                readOnly
                            />
                            <Form.Check
                                inline
                                label="Unspecified"
                                type="radio"
                                name="gender"
                                checked={gender === 'Unspecified'}
                                value="Unspecified"
                                readOnly
                            />
                            </Col>
                            {salErr&&<>
                                    <span className='error-message'>Field Required</span>
                                </>}
                        </Form.Group>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-2"></Form.Group>
                </Row>
                <Row>
                <Form.Group as={Col}  className="mb-2">
                        <Form.Group as={Row} >
                            <Form.Label column sm={4}>
                            Employee # *
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" className="text-end" value={employeeNo} onChange={(e)=>handleChangeEmployee(e.target.value)}/>
                            {empErr&&<>
                                <span className='error-message'>Field Required</span>
                            </>}
                            </Col>
                        </Form.Group>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-2"></Form.Group>
                </Row>
               </Form>
            </div>
        </Container>

    </>
  );
};

export default EmployeeDetails;