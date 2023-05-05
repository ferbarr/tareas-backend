import express from 'express';//Importamos express
import morgan from 'morgan';//Importamos morgan
import cors from 'cors';//Importamos cors
import path from 'path';//Importamos path
import mongoose from 'mongoose';//Importamos moongose

// Conexion a DB
const uri = 'mongodb://localhost:27017/dbTareas';
const options = {useNewUrlParser: true};

mongoose.connect(uri, options).then( () => { console.log('Conectado a DB') },//En caso de que la conexion sea exitosa
  err => { console.log(err) }//En caso de error
);

const app = express();//Guardamos las configuracion de express

// Middleware
app.use(morgan('tiny'));//Usamos morgan
app.use(cors());//Usamos cors
app.use(express.json());//Usamos json
app.use(express.urlencoded({ extended: true }));//Usamos urlencode
// Rutas
          // app.get('/', (req, res) => {
          //   res.send('Hola mundo');
          // });
  app.use('/api',require('./routes/tareas.js'));//Require para que pueda acceder a las rutas de tareas
  app.use('/api',require('./routes/user.js'));//Require para poder acceder a rutas de user
  app.use('/api',require('./routes/login.js'));//Require para poder acceder a rutas de login

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));
//Configuracion del puerto
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('Escuchando puerto: '+ app.get('puerto'));
});