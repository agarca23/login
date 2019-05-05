const Sequelize = require('sequelize')
const db = require('../config/database')

module.exports= db.define('user',
    {
        first_name:{
            type: Sequelize.STRING
        },
        last_name:{
            type: Sequelize.STRING
        },
        first_name:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        },
    }

)