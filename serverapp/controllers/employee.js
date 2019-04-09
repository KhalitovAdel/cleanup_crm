const passport      = require('passport'),
mongoose            = require('mongoose'),
db                  = require('../config/index'),
Employee            = require('../models/employee');

var sendJSONresponse = function(res, status, content) {
    res.status(status).json(content);
}

module.exports.createNewEmployee = function(req, res) {
    var employee = new Employee(req.body);
    employee.save(function(err) {
        if(err) {
            console.log(err);
            return sendJSONresponse(res, 404, err)
        } else {
            return sendJSONresponse(res, 200, {
                message: 'Удачной работы!'
            });
        }
    });
}

module.exports.getEmployeeList = function(req, res) {
    Employee.find({})
        .then(data => {
            return sendJSONresponse(res, 200, data);
        })
        .catch(err=> {
            return sendJSONresponse(res, 404, err);
        });
}