// const fs=require('fs');
// const WriteAndAppend = function (){
//     fs.writeFileSync('sample.txt','Learning NodeJs')
//     fs.appendFileSync('sample.txt',' .Appending Data to sample.txt file')
// }
// module.exports=WriteAndAppend


const express=require('express');
require('./db/mongoose');
const User=require('./models/user')
const Task=require('./models/task')

const app=express()
const port=process.env.PORT || 8000;
app.use(express.json());

//-------POST--------------//

 app.post('/users',(req,res) =>{
    const user=new User(req.body)
    user.save().then(() => res.status(201).send(user))
                .catch(e => res.status(401).send(e))
 })
 app.post('/tasks',(req,res) =>{
    const task=new Task(req.body)
    task.save().then(() => res.status(201).send(task))
                .catch(e => res.status(401).send(e))
 })


 //--------GET..........//

 app.get('/users',(req,res) =>{
    
    User.find({}).then(users => res.send(users))
                .catch(e => res.status(500).send(e))
 })
 app.get('/users/:id',(req,res) =>{
    const _id= req.params.id
    User.findById(_id).then(users =>{
            if(!users) return res.status(404).send()
            res.send(users)
            })
            .catch(e => res.status(500).send(e))
 })
 app.get('/tasks',(req,res) =>{
    Task.find({}).then(tasks => res.send(tasks))
                .catch(e => res.status(500).send(e))
 })
 app.get('/tasks/:id',(req,res) =>{
    const _id= req.params.id
    Task.findById(_id).then(tasks =>{
            if(!tasks) return res.status(404).send()
            res.send(tasks)
            })
            .catch(e => res.status(500).send(e))
 })

 //---------PUT--------//
app.put('/users/:id',async(req,res)=>{
    try {
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!user) return res.status(404).send()
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})
app.put('/tasks/:id',async(req,res)=>{
    try {
        const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!task) return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

 //---------DELETE--------//

 app.delete('/tasks/:id',async(req,res)=>{
    try {
        const task=await Task.findByIdAndDelete(req.params.id,req.body,{new:true})
        if(!task) return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})
 app.delete('/users/:id',async(req,res)=>{
    try {
        const user=await User.findByIdAndDelete(req.params.id,req.body,{new:true})
        if(!user) return res.status(404).send()
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})



 app.listen(port, ()=> console.log(`Server Running in the ${port}`))