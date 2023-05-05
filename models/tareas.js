import mongoose from 'mongoose'; //Importamos moongose
const Schema = mongoose.Schema; //var para acceder a las funciones de schema

const tareasSchema = new Schema({ //Creamos nuestro schema
  nombre: {type: String, required: [true, 'Nombre obligatorio']},
  descripcion: String,
  usuarioId: String,
  date:{type: Date, default: Date.now},
  activo: {type: Boolean, default: true}
});

// Convertir a modelo
const Tarea = mongoose.model('Tarea', tareasSchema);

export default Tarea;//Exportamos modelo