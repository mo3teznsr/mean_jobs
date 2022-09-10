const express = require('express');
const isAdmin=require('../middleware/require-admin');
const Industry=require('../models/industry.model')
const requireAdmin=require('../middleware/require-admin')
const router = express.Router();
module.exports = router;



router.get('/list', async function(req,res){
    try{
        var list= await Industry.find()

        return res.json(list);

    } 
    catch(e)
    {
        return res.status(500).send(e.message)
    }
});


router.post('/',requireAdmin,async function(req,res){

    try 
    {
        await Industry.create(req.body)
        return res.json({message:"Successfully created"})
    }
    catch{
        return res.status(400).send(e.message)
    }

});

router.put('/:id',requireAdmin,async function(req,res){

    try 
    {
       
        await Industry.findOneAndUpdate({_id:req.params.id},req.body,{new:true})

        return res.json({message:"Successfully updated"})
    }
    catch{
        return res.status(400).send(e.message)
    }

});


