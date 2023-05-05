import jwt from 'jsonwebtoken';

const verificarAuth = (req, res, next) => {

  // Leer headers
  const token = req.get('token');

  jwt.verify(token, 'secret', (err, decoded) => {

    if(err) {
      return res.status(401).json({
        mensaje: 'Error de token',
      })
    }

    req.usuario=decoded.data;
    next();

  });

}

const verificarAdmin=(req,res,next)=>{
  const rol=req.usuario.rol;
  if(rol==='Admin'){
    next();
  }else{
    return res.status(401).json({
      mensaje:'No tienes permiso'
    });
  }

}

module.exports= {verificarAuth,verificarAdmin};