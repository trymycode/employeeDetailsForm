const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
  name:{ type: String, required: true },
  position: { type: String, required: true },
  office:{ type: String, required: true },
  salary: { type: Number, required: true }
});

const Employee = module.exports = mongoose.model('Employee', EmployeeSchema);