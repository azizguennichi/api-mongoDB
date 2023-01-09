const express = require('express')
const userRoute = require('./routers/user.route')
// const mongoose = require('mongoose')
const studentRoute = require('./routers/student.route')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// mongoose.connect('mongodb://127.0.0.1:27017/nesrine',{useNewUrlParser: true, useUnifiedTopology: true})
// .then(res=> console.log('Db connected'))
// .catch(err=> console.log(err))


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*")
    res.setHeader('Access-Control-Request-Method',"*")
    res.setHeader('Access-Control-Allow-Headers',"*")
    next()
})


app.use('/',studentRoute)
app.use('/',userRoute)



app.listen(3000,()=>{
    console.log('server run')
})