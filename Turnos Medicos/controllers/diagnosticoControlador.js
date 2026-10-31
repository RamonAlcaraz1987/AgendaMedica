const Diagnostico = require("../entidades/diagnosticoModelo");

class DiagnosticoControlador{

    

    async getCalidadesDiagnostico(req,res){
        try{
            const TiposCalidades = await Diagnostico.getTiposDiagnostico();
            return TiposCalidades || [];
        }catch(error){
            console.log(error);
            return [];
        }    
    }




    async getDiagnostico(req,res){
        try{
            const diagnostico = await Diagnostico.get();
            res.render('views/diagnostico', {diagnostico: diagnostico});
        }catch(error){
            console.log(error);
        }
    }
    async getDiagnosticoById(req,res){
        try{
            const id = req.params.id;
            const diagnostico = await Diagnostico.getById(id);
            res.render('views/diagnostico', {diagnostico: diagnostico});
        }catch(error){
            console.log(error);
        }
    }

    async createDiagnostico(req,res){
        try{
            const diagnostico = req.body;
            const result = await Diagnostico.create(diagnostico);
            res.send('Diagnostico creado');
        }catch(error){
            console.log(error);
        }
    }

    async updateDiagnostico(req,res){
        try{
            
            const diagnostico = req.body;
            await Diagnostico.update(diagnostico);
            res.send('Diagnostico actualizado');
        }catch(error){
            console.log(error);
        }
    }

    async deleteDiagnostico(req,res){
        try{
            const id = req.params.id;
            const result = await Diagnostico.delete(id);
            res.redirect('/diagnostico');
        }catch(error){
            console.log(error);
        }
    }


}

module.exports = new DiagnosticoControlador();