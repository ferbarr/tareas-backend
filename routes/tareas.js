import express from "express"; //importamos express
const router=express.Router();//Guardamos funciones de router
import Tarea from '../models/tareas';//Importamos el modelo
const {verificarAuth,verificarAdmin} = require('../middlewares/auth');

//Ruta post para agregar tarea
router.post('/add-tarea',verificarAuth, async(req, res) => {//Creamos ruta post que luego sera utilizada en un formulario, y pasamos un funcion que recibe dos pararametros
    const datos = req.body;  //Con el req recibe la informacion y con el .body la accedemos
    datos.usuarioId=req.usuario.user;
    try {
      const addTarea = await Tarea.create(datos);//Guardamos la informacion en nuestro modelo pasando la variable datos
      res.status(200).json(addTarea); //Con res accedemos a las respuestas en este caso sera 200 de satisfactorio y hacemos un json para manipular el frontend
    } catch (error) {
      return res.status(500).json({//En caso de erro, retorna codigo 500 y un json para visualizar en el front
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });
  // Ruta get para traer datos con parametros
  router.get('/get-tarea/:id', async(req, res) => {//Creamos rutas con un parametros para traer ese datos en especifico, y hacemos funcion que recibe req y res
    const _id = req.params.id;//Traemos el datos de la url que es el id de la coleccion, el _ es porque asi lo pone mongo
    try {
      const tareaGet = await Tarea.findOne({_id});//Al esquema le pasamos funcion que busca y le pasamos como objeto el -id
      res.status(200).json(tareaGet);//Si el status es 200 le pasamos el json y la informacion
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

  // Ruta get sin parametros
  router.get('/get-tarea/', verificarAuth,async(req, res) => {//Creamos ruta para traer todos los datos, y hacemos funcion que recibe req y res
    const user=req.usuario.user
    const limite=Number(req.query.limite)||5;
    const skip=Number(req.query.salto)||0;
    try {
      const tareaGet = await Tarea.find({usuarioId:user}).limit(limite).skip(skip);//Al esquema le pasamos funcion que busca todo
      const totalDocs=await Tarea.find({usuarioId:user}).countDocuments();
      res.status(200).json({tareaGet,totalDocs});//Si el status es 200 le pasamos el json y la informacion
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });
  
  // Ruta delete
router.delete('/delete-tarea/:id', async(req, res) => {//Creamos ruta que recibe de paramtro el id de la tarea y la funcion que hara la ruta
  const _id = req.params.id;//Guardamos el id que se mande
  try {
    const tareaDelete = await Tarea.findByIdAndDelete({_id});//Ejecutamos funcion que busca y elimina
    if(!tareaDelete){//En caso de que no encuentre y elimine mandamos error
      return res.status(404).json({
        mensaje: 'No se encontró el id indicado',
        error
      })
    }
    res.status(200).json(tareaDelete); 
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});
// Ruta put
router.put('/update-tarea/:id', async(req, res) => {//Ruta que recibe parametro y funcion que hara esa ruta
  const _id = req.params.id;//Guardamos el id que se mande
  const datos = req.body;//Guardamos los datos que se envien
  try {
    const tareaUpdate = await Tarea.findByIdAndUpdate(//funcion que busca y actualiza la coleccion
      _id,//indicamos el id
      datos,//pasamos los datos
      {new: true});//para que muestre los nuevos datos en el json
    res.status(200).json(tareaUpdate);  
  } catch (error) {
    return res.status(400).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});
  
  // Exportamos la configuración de express app
  module.exports = router;