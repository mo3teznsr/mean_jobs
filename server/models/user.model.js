const mongoose = require('mongoose');

const experienceSchema=new mongoose.Schema({
  title:{type:String,required:true},
  company:{type:String,required:true},
  industry:{type:String,required:true},
  started:{type:Date,required:true},
  ended:{type:Date,required:true},
})

const educationSchema=new mongoose.Schema({
  school:{type:String,required:true},
  ended:{type:Date,required:true},
  heightLevel:{type:Boolean,required:true,default:false},
})

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile:{type:String,required:true,unique:true},
    email: {
      type: String,
      required: true,
      unique: true,
      // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    role:
      {
        type: String,default:"customer"
      },
    skills:[{type:String,default:[]}],
    education:[educationSchema],
    experiance:[experienceSchema],
    cv:{type:String,default:""}

    
  }
);

module.exports = mongoose.model('User', UserSchema);
