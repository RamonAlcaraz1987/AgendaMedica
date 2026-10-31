const Antecedente = require('../entidades/antecedenteModelo');

class AntecedenteControlador {
    async getAntecedentes(req, res) {
        try {    
            const antecedentes = await Antecedente.get();
            res.render('views/antecedente', { antecedentes: antecedentes });
        } catch (error) {
            console.error('Error al obtener los antecedentes:', error);
            res.status(500).send('Error al obtener los antecedentes');
        }
    }


    async createAntecedente(req, res) {    
        try {    
            const antecedente = req.body;
            await Antecedente.create(antecedente);
            res.send('Antecedente creado');
        } catch (error) {
            console.error('Error al crear el antecedente:', error);
            res.status(500).send('Error al crear el antecedente');
        }
    }

    async deleteAntecedente(req, res) {
        try {
            const id = req.params.id;
            const deleted = await Antecedente.delete(id);
            if (deleted) {
                res.redirect('/antecedente');
            } else {
                res.status(404).send('Antecedente no encontrado');
            }
        } catch (error) {
            console.error('Error al eliminar el antecedente:', error);
            res.status(500).send('Error al eliminar el antecedente');
        }
    }

    async updateAntecedente(req, res) {
        try {   
            
            const antecedente = req.body;
            await Antecedente.update(antecedente);
            
            res.send('Antecedente actualizado');
                
        } catch (error) {
            console.error('Error al actualizar el antecedente:', error);
            res.status(500).send('Error al actualizar el antecedente');
        }
    }   

    async getAntecedenteById(req, res) {
        try {
            const id = req.params.id;
            const antecedente = await Antecedente.getById(id);
            if (antecedente) {
                res.json(antecedente);
            } else {
                res.status(404).send('Antecedente no encontrado');
            }
        } catch (error) {
            console.error('Error al obtener el antecedente:', error);
            res.status(500).send('Error al obtener el antecedente');
        }
    }   


}   

module.exports = new AntecedenteControlador();
