const mongoose = require('mongoose');



const ApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,ref:"User",
      required: true,
    },
    job:{type:mongoose.SchemaTypes.ObjectId,required:true,ref:"User"},

    createdAt: {
      type: Date,
      default: Date.now,
    },

    
  }
);

module.exports = mongoose.model('Application', ApplicationSchema);
