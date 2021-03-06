const express= require('express')
const users= express.Router()
const cors =require('cors')
const jwt= require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User= require('../models/User')
users.use(cors())

process.env.SECRET_KEY='secret'

users.post('/register', (req, res)=>{
    //leemos el body y lo añadimos a un json
    const userData={
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    }
    //comprobamos que ese email no este registrado
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(user=>{
        //Generamos un hash con la clave del usuario para almacenar en bbdd
        if(!user){
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                userData.password=hash
                User.create(userData)
                .then(user=>{
                    res.json({status: user.email +' registrado'})
                })
                .catch(err=>{
                    res.send('error: '+err)
                })
            })
        }else{
            res.json({error: 'El usuario ya existe.'})
        }
    })
    .catch(err=>{
        res.send('error: '+ err)
    })
})

users.post('/login', (req, res)=>{
    //buscamos el email en bbdd
    User.findOne({
        where:{
            email: req.body.email
        }
    })
    .then(user=>{
        if(user){
            //comparamos el hash de la bbdd con el hash generado con la password que nos pasan
            if(bcrypt.compareSync(req.body.password, user.password)){
                let token=jwt.sign(user.dataValues, process.env.SECRET_KEY,{
                    expiresIn:1440
                })
                res.send(token)
            }
        }else{
            res.status(400).json({error: 'El usuario no existe'})
        }
    })
    .catch(err=>{
        res.status(400).json({error: err})
    })
})

module.exports= users