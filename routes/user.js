import express from 'express';
import _ from 'underscore';
import bcrypt from'bcrypt';
const {verificarAuth,verificarAdmin} =require('../middlewares/auth');
import User from '../models/user'; //Importamos nuestro modelo
const router=express.Router();



const salto= 10;


// POST
router.post('/add-user', async(req,res)=>{
    const datos={
        user:req.body.user,
        pass:bcrypt.hashSync(req.body.pass, salto),
        rol:req.body.rol
    }
    try {
        const addUser=await User.create(datos);
        res.status(200).json(addUser);
        
    } catch (error) {
        return res.status(500).json({
            mensaje:'Ocurrio un error',
            error
        })
    }

});
// Ruta get sin parameters
router.get('/get-user/', async(req, res) => {
    
    try {
      const getUser = await User.find();
      res.status(200).json(getUser);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

  //PUT
router.put('/update-user/:id',[verificarAuth,verificarAdmin], async(req, res) => {

  let id = req.params.id;
  let body = _.pick(req.body, ['estado', 'rol', 'pass']);
  if(body.pass){
    body.pass = bcrypt.hashSync(req.body.pass, salto);
  }

  try {
  
    const usuarioDB = await User.findByIdAndUpdate(id, body, {new: true, runValidators: true});

     res.json(usuarioDB);

  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }

});

module.exports=router;