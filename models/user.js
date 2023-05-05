import mongoose from 'mongoose'; //Importamos moongose
const Schema = mongoose.Schema; //var para acceder a las funciones de schema
const uniqueValidator = require('mongoose-unique-validator');

const roles={ //Roles de usuario
    values:['Admin','User'],
    message: 'El rol {VALUE} no es valido'
};

const userSchema = new Schema({
    user:   { type: String, required: [true, 'Nombre obligatorio'],unique:true},
    pass: { type: String, required:[true, 'Contraseña obligatoria'] },
    rol: { type: String, required:[true,'Rol obligatorio'], enum: roles },
    estado: { type: Boolean,required:true, default: true }
  });

  //Hacemos validacion y mensaje de error por si se repite
  userSchema.plugin(uniqueValidator, { message: 'Usuario existente.' });

//Eliminar contraseña de respuesta JSON
  userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.pass;
    return obj;
   }
//   Covertimos a modelo
const User =mongoose.model('User',userSchema);

export default User; //Exportamos modelo para usarlo