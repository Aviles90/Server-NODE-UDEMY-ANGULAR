const{ response } = require('express');

const crearUsuario = (req,res = response) => { //response lo usaremos como un tipado, es comp`letamente opcional
    console.log( req.body );
    const {email, name, password} = req.body; //forma de capturar el body
    console.log(email, name, password);

    return res.json({
        ok: true,
        msg: 'Crear usuario /new'
    });
}

const loginUsuario = (req,res = response) => {    

    const {email, password} = req.body;
    console.log(email, password);

    return res.json({
        ok: true,
        msg: 'Login de usuraio /'
    });
}

const revalidarToken = (req,res = response) => {
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