const{ response } = require('express');
const { validationResult } = require('express-validator');

const crearUsuario = (req,res = response) => { //response lo usaremos como un tipado, es comp`letamente opcional

    const errors = validationResult( req );

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    console.log( req.body );
    const {email, name, password} = req.body; //forma de capturar el body
    console.log(email, name, password);

    return res.json({
        ok: true,
        msg: 'Crear usuario /new'
    });
}

const loginUsuario = (req,res = response) => {    

    const errors = validationResult( req );
    // console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

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