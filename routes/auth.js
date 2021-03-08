const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

const router = Router();

// - - - CREAR UN NUEVO USUARIO - - - 
router.post('/new', crearUsuario)

// - - - LOGIN DE USUARIO - - -
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({min: 6})
    
], loginUsuario)

// - - - VALIDAR Y REVALIDAR EL TOKEN - - -
router.get('/renew', revalidarToken)

module.exports = router;