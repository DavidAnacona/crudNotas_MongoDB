const express = require("express")
const router = express.Router();
const Task = require('../models/task');

router.get("/home", async(req,res)=>{
    try{
        const tasks = await Task.find({});
        res.render("index", {tasks});
    }catch(error){
        console.log(error);
    }
    
    
})

router.post("/add",(req,res)=>{
    const {titulo,descripcion} = req.body;
    
    const task = new Task({title: titulo, description: descripcion});
    task.save().then((respuesta)=>{
        console.log(respuesta)
        res.redirect("/home");
    })
    .catch((err)=> console.log(err));
})

router.get("/delete/:id", async (req,res)=>{
    try{
        const { id } = req.params
        await Task.remove({_id:id});
        res.redirect("/home");
    }catch(error){
        console.log(error)
    }
});

router.get("/done/:id", async (req,res)=>{
    try{
        const { id } = req.params;
        const status = await Task.findById(id);
        const taskUpdate = await Task.updateOne(
            {_id:id}, 
            { $set: {status: !status.status }},
            { upsert: true}
            );
        console.log(taskUpdate);
        res.redirect("/home");
    }catch(error){
        console.log(error)
    }
});

router.get("/update/:id", async (req,res)=>{
    
    try{
        const { id } = req.params;
        const task = await Task.findById(id);
        res.render('update',{
            task
        })
    }catch(error){
        console.log(error);
    }
});

router.post("/edit/:id", async (req,res)=>{
    try{
        const { id } = req.params;
        const { titulo, descripcion} = req.body;
        await Task.updateOne({_id: id}, 
            {$set: {title: titulo, description: descripcion}},
            {upsert: true}
        );
        res.redirect("/home");
    }catch(error){
        console.log(error);
    }
})

module.exports = router;