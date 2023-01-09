const route = require('express').Router()
const routeModel = require('../models/user.model')


route.post('/register',(req,res)=>{
   routeModel.register(req.body.userName,req.body.email,req.body.password)
   .then((user)=>res.status(200).send({user:user,mssg:"added !"}))
   .catch((err)=>res.status(400).send({error:err}))
})

route.post('/login',(req,res)=>{
    routeModel.login(req.body.email,req.body.password)
    .then((token)=>res.status(200).send({token:token}))
    .catch((err)=>res.status(400).send({error:err}))
 })
 


module.exports = route