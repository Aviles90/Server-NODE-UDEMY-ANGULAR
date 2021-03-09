const{ response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req,res = response) => { //response lo usaremos como un tipado, es comp`letamente opcional
    // console.log( req.body );
    const {email, name, password} = req.body; //forma de capturar el body
    // console.log(email, name, password);

    try {
         // verificar email unico
            // let usuario = await Usuario.findOne({ email: email})
            const usuario = await Usuario.findOne({ email}) //EcMa Script 6
            if (usuario){
                return res.status(400).json({
                    ok: false,
                    msg: `Ya existe un usuario con este email: ${email}`
                });
            }
        // Crear usuario con el modelo
            const dbUser = new Usuario( req.body );

        // Hashear la contraseña
            // const salt = bcrypt.genSaltSync(10);
            const salt = bcrypt.genSaltSync();
            dbUser.password = bcrypt.hashSync( password, salt )

        //Generar el JSON Web Token
            const token = await generarJWT( dbUser.id, name )

        //Crear Usuario en BD
            await dbUser.save();

        //Generar respuesta 
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Algo salio mal, comuniquese con el administrador'
        });
    }
}

const loginUsuario = async(req,res = response) => {    

    const {email, password} = req.body;
    // console.log(email, password);

    try {

        const dbUser = await Usuario.findOne({ email });

        if ( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            })
        }
        //confirmar si el password hace match
        const validPassword = bcrypt.compareSync( password, dbUser.password);

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es valido'
            })
        }

        // generar el JSON WEB TOKEN
        const token = await generarJWT( dbUser.id, dbUser.name )

        // respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        })


        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }
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