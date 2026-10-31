const Usuario = require('../entidades/usuarioModelo');

class UsuarioControlador
{
    async getUsuarios(req,res){
        try{
            const usuarios = await Usuario.get();
            res.render('views/usuario', {usuarios: usuarios});
        }catch(error){
            console.log(error);
        }
    }

    async getUsuarioById(req,res){
        try{
            const id = req.params.id;
            const usuario = await Usuario.getById(id);
            res.render('views/usuario', {usuario: usuario});
        }catch(error){
            console.log(error);
        }
    }

    async createUsuario(req,res){
        try{
            const usuario = req.body;
            await Usuario.create(usuario);
            res.redirect('/usuario');
        }catch(error){
            console.log(error);
        }
    }

    async deleteUsuario(req,res){
        try{
            const id = req.params.id;
            await Usuario.delete(id);
            res.redirect('/usuario');
        }catch(error){
            console.log(error);
        }
    }

    async updateUsuario(req,res){
        try{
            const id = req.params.id;
            const usuario = req.body;
            await Usuario.update(id, usuario);
            res.redirect('/usuario');
        }catch(error){
            console.log(error);
        }
    }
}
module.exports = new UsuarioControlador();