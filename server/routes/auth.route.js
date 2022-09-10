const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const userModel=require('../models/user.model')
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');
const multer = require("multer");

const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(register), login);
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  login
);
router.get('/me', passport.authenticate('jwt', { session: false }), login);

async function register(req, res, next) {
  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.password;
  req.user = user;
  next();
}

router.post('/profile',passport.authenticate('jwt', { session: false }),async function(req,res){

  try{
    
await userModel.findOneAndUpdate({_id:req.user._id},req.body,{new:true})





return res.json({message:"Successfuly updated"})
  }
  catch(e)
  {
    return res.status(500).json(e.message);
  }
});

function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}


router.post("/cv",  passport.authenticate('jwt', { session: false }),async function(req, res) {
  try {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
      
        let cv = req.files.cv;
        
        var filename=Date.now()+'.'+cv.name.split('.').pop()
        cv.mv('./src/assets/uploads/' + filename);

        await userModel.findOneAndUpdate({_id:req.user._id},{cv:filename},{new:true})


        //send response
        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                cv: filename,
                
            }
        });
    }
} catch (err) {
    res.status(500).send(err);
}
});

