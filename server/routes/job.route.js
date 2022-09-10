const express = require('express');
const JobModel=require('../models/job.model')
const requireAdmin=require('../middleware/require-admin')
const Application=require('../models/application.model')
const router = express.Router();
module.exports = router;
const passport = require('passport');


router.get('/list', async function(req,res){
    try{
        var list= await JobModel.find().sort({createdAt:-1})

        return res.json(list);

    } 
    catch(e)
    {
        return res.status(500).send(e.message)
    }
});



router.post('/apply/:id',passport.authenticate('jwt', { session: false }),async function(req,res){

    try 
    {
        var application=await Application.findOne({user:req.user._id,job:req.params.id})
        if(application)
        {
            return res.status(400).send('you already appply to this job')
        }

        await Application.create({user:req.user._id,job:req.params.id})
        return res.json({message:"Application created"})
    }
    catch(e){
        return res.status(400).send(e.message)
    }

});

router.get('/applications/:id',[passport.authenticate('jwt', { session: false }),requireAdmin],async function(req,res){

    try{
        var applications=await Application.find({job:req.params.id}).populate('user').sort({createdAt:-1})

        return res.json(applications)
    }
    catch(e)
    {
        return res.status(500).send(e.message)
    }
})


router.post('/',[passport.authenticate('jwt', { session: false }),requireAdmin],async function(req,res){

    try 
    {
        await JobModel.create(req.body)
        return res.json({message:"Successfully created"})
    }
    catch(e){
        return res.status(400).send(e.message)
    }

});

router.put('/:id',[passport.authenticate('jwt', { session: false }),requireAdmin],async function(req,res){

    try 
    {
       
        await JobModel.findOneAndUpdate({_id:req.params.id},req.body,{new:true})

        return res.json({message:"Successfully updated"})
    }
    catch{
        return res.status(400).send(e.message)
    }

});


