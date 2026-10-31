const Persona = require('../entidades/personaModelo');

class PersonaControlador{
    async getPersonas(req,res){
        try{
            const personas = await Persona.get();
            res.render('views/agenda', {personas: personas});
        }catch(error){
            console.log(error);
        }
    }
async getPersonaById(req,res){
    try{
        const id = req.params.id;
        const persona = await Persona.getById(id);
        res.render('views/agenda', {persona: persona});
    }catch(error){
        console.log(error);
    }
}



}

module.exports = new PersonaControlador();