const mongoose          = require('mongoose');

EmployeeSchema = new mongoose.Schema({
  details: {
    fullName: String,
    birthDate: Date,
    contactPhone: [
      String
    ],
    homeAddress: String,
    workAdresses: Array,
    workHistory: String,
    workGrah: String
  },
  creatingDate: Date,
  });
  

  var Employee  = mongoose.model('Employee', EmployeeSchema);
 
  module.exports = Employee;