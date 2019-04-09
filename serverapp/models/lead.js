const mongoose          = require('mongoose');

LeadSchema  = new mongoose.Schema({
    details: {
        leadStatus: String,
        firmName: String,
        contactPhones: [String],
        contactName: String,
        position: String,
        contactEmail: String,
        address: String,
        lprsName: String,
        link2gis: String,
    },
    leadId: String,
    comments: [{description: String, createdDate: String}],
    tasks: [{
      status: String,
      action: String,
      description: String,
      createdDate: String,
      deadLineDate: String,
      finishedDate: String
    }],
    createdDate: String
  });

  var Lead  = mongoose.model('Lead', LeadSchema);
 
  module.exports = Lead;