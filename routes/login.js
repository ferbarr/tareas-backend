import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user'; //Importamos nuestro modelo
const router = express.Router();



router.post('/login', async(req, res) => {

    let body = req.body;
  
    try {
      // Buscamos user en DB
      const usuarioDB = await User.findOne({user: body.user});
  
      // Evaluamos si existe el usuario en DB
      if(!usuarioDB){
        return res.status(400).json({
          mensaje: 'Usuario incorrecto',
        });
      }
  
      // Evaluamos la contraseña correcta
      if( !bcrypt.compareSync(body.pass, usuarioDB.pass) ){
        return res.status(400).json({
          mensaje: 'Contraseña incorrecta',
        });
      }
  
// Generar Token
let token = jwt.sign({
    data: usuarioDB
  }, 'secret', { expiresIn: 60 * 60 * 24 * 30}) // Expira en 30 días

      // Pasó las validaciones
      return res.status(200).json({
        usuarioDB,
        token
      })
      
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      });
    }
  
  });
module.exports = router;