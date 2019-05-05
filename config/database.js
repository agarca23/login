const Sequelize= require('sequelize')
module.exports= new Sequelize('appWeb', 'andres', '1234', {
    dialect: 'mysql',
    host: '192.168.1.4',

});