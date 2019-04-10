const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const Employee = require('../models/employee');
// ===ROUTES===
// retriving employees list
router.get('/employees', (req, res, next)=>{
  Employee.find(function(err, employees){
    res.json(employees);
    console.log("Retriving employees....." + employees);
  })
});

// get employee details by id
router.get('/:id', (req, res, next)=>{
  if(!ObjectId.isValid(req.params.id))
  
    return res.status(400).send("No record found with this given id:- " + req.params.id);
  
  
    Employee.findById(req.params.id,(err,Employeedetails)=>{
      if(!err)
        {
          res.send(Employeedetails);
        }
      else {
        console.log("Error in retriving employee details"+ JSON.stringify(err, undefined, 2));
      }
    })
  
})
// add new employee details
router.post('/employees',(req, res, next)=>{
  // logic to add employee
  let newEmployee = new Employee({
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary
  });
  newEmployee.save((err, employee)=>{
    if(err){
      console.log(err);
      res.json({msg:'failed to add employee'});
      console.log("Error in posting new employee details"+ JSON.stringify(err, undefined, 2));
    } else {
      res.json({msg:'employee added successfully.'})
      console.log("Error in the time of saving employee details"+ JSON.stringify(err, undefined, 2));
    }
  })
});

// edit employee details
router.put('/:id',(req, res, next)=>{
  // logic to edit an employee
  if(!ObjectId.isValid(req.params.id))
  
    return res.status(400).send("No record found with this given id:- " + req.params.id);

 var editedEmployeeDetails = {
   name: req.body.name,
   position: req.body.position,
   office: req.body.office,
   salary: req.body.salary
 };

 Employee.findByIdAndUpdate(req.params.id, { $set: editedEmployeeDetails}, { new: true }, (err, details)=>{
   if(!err) {
     res.send(details);
   }else{
     console.log("Error in employee update:-" + JSON.stringify(err, undefined, 2));
   }
 })

});

// // delete employee details

router.delete('/employee/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

  Employee.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports = router;