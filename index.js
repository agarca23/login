var express= require('express');
var cors = require('cors');
var bodyParser= require('body-parser');
var app = express();
var port =process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

//DataBase
const db = require('./config/database');

//Comprobación de conexión
db.authenticate()
  .then(() => {
    console.log('Conectado');
  })
  .catch(err => {
    console.log('No se conecto');
  });

db.sync();

var Users =require('./routes/Users');

app.use('/users', Users);
app.listen(port, ()=>{
    console.log('Servidor escuchando en el puerto: '+ port);
});