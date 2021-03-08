const{ response } = require('express')

const crearUsuario = (req,res = response) => { //response lo usaremos como un tipado, es comp`letamente opcional
    return res.json({
        ok: true,
        msg: 'Crear usuario /new'
    });
}

const loginUsuario = (req,res) => {
    return res.json({
        ok: true,
        msg: 'Login de usuraio /'
    });
}

const revalidarToken = (req,res) => {
    return res.json({
        ok: true,
        msg: 'Renew'
    });
}

module.exports={
    crearUsuario,
    loginUsuario,
    revalidarToken
}