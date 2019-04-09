const mongoose          = require('mongoose');

MaterialSchema = new mongoose.Schema({
    type: String,
    name: String,
    urlLink: String,
    price: Number,
    norms: Number,
    volume: Number,
    area: Number,
    expluotation: Number,
    description: String,
  });
  

  var Material  = mongoose.model('Material', MaterialSchema);
 
  module.exports = Material;