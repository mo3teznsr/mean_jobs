const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company:{type:String,required:true},
    desciption:{type:String,required:true},
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isActive:{type:Boolean,default:true},
    industry:{type:String,required:true},
  }
);

module.exports = mongoose.model('Company', CompanySchema);
