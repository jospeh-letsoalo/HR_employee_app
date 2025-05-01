const express = require('express');
const router = express.Router();
const { getEmployees, saveEmployee } = require('../modules/modules');

// Shorten URL
router.post('/saveEmployee', async (req, res) => {

    const { employee } = req.body;
    const ret_value = await saveEmployee(employee);

    if(ret_value){
        console.log('return value here ------',ret_value)
        res.status(201).send({message:'employee details saved'})

    }else{
        res.status(500).send({ error: 'Failed to add employee' })
    }
    
});

// Redirect to Long URL
router.get('/getEmployees', async (req, res) => {

   let data = await getEmployees()
   //console.log('return data5555555:',data)
   if(Array.isArray(data)){
   // console.log('return data:',data)
    res.send(data)
   }else{
    //console.log(data)
    res.status(500).send(data)
   }
 
});


module.exports = router;