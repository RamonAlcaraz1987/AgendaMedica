const Habito = require('../entidades/habitoModelo');

class HabitoControlador{
    async getHabitos(req,res){
        try{
            const habitos = await Habito.get();
            res.render('views/habitos', {habitos: habitos});
        }catch(error){
            console.log(error);
        }
    }

    async getHabitoById(req,res){
        try{
            const id = req.params.id;
            const habito = await Habito.getById(id);
            res.render('views/habitos', {habito: habito});
        }catch(error){
            console.log(error);
        }
    }

    async createHabito(req,res){
        try{
            const habito = req.body;
            await Habito.create(habito);
            res.send('Habito creado');
        }catch(error){
            console.log(error);
            res.status(500).send('Error al crear el habito');
        }
    }

    async updateHabito(req,res){
        try{
            const habito = req.body;
            await Habito.update(habito);
            res.send('Habito actualizado');
        }catch(error){
            console.log(error);
        }
    }

    async deleteHabito(req,res){
        try{
            const id = req.params.id;
            const result = await Habito.delete(id);
            res.redirect('/habitos');
        }catch(error){
            console.log(error);
        }
    }
}
module.exports = new HabitoControlador();