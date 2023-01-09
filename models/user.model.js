const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


let schemaUser=mongoose.Schema({
    userName:String,
    email:String,
    password:String
})
let url = 'mongodb://127.0.0.1:27017/university'

var User = mongoose.model('user',schemaUser)


exports.register=(userName,email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return  User.findOne({email:email})
        }).then((doc)=>{
            if(doc){
                mongoose.disconnect()
                reject('email is exist')
            }else{
                bcrypt.hash(password,10).then((hashedPassword)=>{
                     let user = new User({
                        userName:userName,
                        email:email,
                        password:hashedPassword
                     })
                        user.save().then((user)=>{
                            mongoose.disconnect()
                            resolve(user)
                        }).catch((err)=>{
                            mongoose.disconnect()
                            reject(err)
                        })

                }).catch((err)=>{
                    mongoose.disconnect()
                    reject(err)
                })
            }
        })
    })
}

var privetKey="this is my secret key : jhomqdjssqmjdsqk"

exports.login=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
           return  User.findOne({email:email})       
        }).then((user)=>{
            if (!user){
                  mongoose.disconnect()
                  reject('we dont have this email in our database')
            }else{
                bcrypt.compare(password,user.password)
                .then((same)=>{
                    if (same){
                         let token = jwt.sign({id:user._id,userName:user.userName},privetKey,{
                            expiresIn:'1h',
                          })
                          mongoose.disconnect()
                          resolve(token)
                    }else{
                       mongoose.disconnect()
                       reject('invalid password')
                    }
                }).catch((err)=>{
                    mongoose.disconnect()
                    reject(err)
                })
            }
        })
    })
}