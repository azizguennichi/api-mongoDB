const studenModel = require('../models/student.model')
const route = require('express').Router()
const jwt = require('jsonwebtoken')
route.get('/',(req,res,next)=>{
    studenModel.testConnect().then((mssg)=>res.send(mssg)).catch((err)=>res.send(err))
})



var privetKey="this is my secret key : jhomqdjssqmjdsqk"


verifyToken=(req,res,next)=>{
      let token= req.headers.authorization
      if(!token){
        res.status(400).send({mssg:'a3mel login'})
      }
      try {
       jwt.verify(token,privetKey)
       next()
      } catch (e) {
        res.status(400).send({mssg:e})
      }
}

var secretKey="Aziz"
var clientKey="1272002"



route.post('/addstudent',(req,res,next)=>{
    studenModel.postNewStudent(req.body.firstName,req.body.lastName,req.body.email,req.body.age,req.body.phone)
    .then((doc)=>res.status(200).send(doc))
    .catch((err)=>res.status(400).send({error:err}))
})



route.get('/students',(req,res,next)=>{
    // if(req.params.secret == secretKey && req.params.client == clientKey){
    //     let token= req.headers.authorization
    //     let user = jwt.decode(token,{complete:true})
        studenModel.getAllStudents() 
        .then((doc)=>res.status(200).send(doc))
        .catch((err)=>res.status(400).send(err))
    // }else{
    //     res.status(400).json({err:'matnajemesh todkhel'})
    // }
  
})

route.get('/student/:id',(req,res,next)=>{
    studenModel.getOneStudent(req.params.id) 
    .then((doc)=>res.status(200).send(doc))
    .catch((err)=>res.status(400).send(err))
})
route.delete('/student/:id',verifyToken,(req,res,next)=>{
    studenModel.deleteOneStudent(req.params.id) 
    .then((doc)=>res.status(200).send(doc))
    .catch((err)=>res.status(400).send(err))
})
route.patch('/student/:id',verifyToken,(req,res,next)=>{
    studenModel.updateOneStudent(req.params.id,req.body.firstName,req.body.lastName,req.body.email,req.body.age,req.body.phone) 
    .then((doc)=>res.status(200).send(doc))
    .catch((err)=>res.status(400).send(err))
})


module.exports = route