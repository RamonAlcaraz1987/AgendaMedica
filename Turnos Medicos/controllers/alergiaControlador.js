const Alergia = require('../entidades/alergiaModelo');

class alergiaControlador {


    async getAlergiasNomencladas(req, res) {
        try {
            const tiposAlergias = await Alergia.getTiposAlergias();
            return tiposAlergias || [];
        } catch (error) {
            console.log(error);
            return [];
        }
    }   

    async getAlergias(req, res) {
        try {
            const alergias = await Alergia.get();
            res.render('views/alergia', {alergias: alergias});
        } catch (error) {
            console.log(error);
        }
    }
    
    async getAlergiaById(req, res) {
        try {
            const id = req.params.id;
            const alergia = await Alergia.getById(id);
            res.render('views/alergia', {alergia: alergia});
        } catch (error) {
            console.log(error);
        }
    }

    async createAlergia(req, res) {
        try {
            const alergia = req.body; 
            await Alergia.create(alergia); 
            res.send('Alergia creada');
            console.log(alergia);
        } catch (error) {
            console.log(error);
            res.status(500).send('Error al crear la alergia');
        }
    }
    async updateAlergia(req, res) {
        try {
            
            const alergia = req.body;
            await Alergia.update(alergia);
            res.send('Alergia actualizada');
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAlergia(req, res) {
        try {
          const id = req.params.id;
          const success = await Alergia.delete(id);
          if (success) {
            res.json({ success: true });
          } else {
            res.json({ success: false });
          }
        } catch (error) {
          console.log('Error al eliminar la alergia:', error);
          res.status(500).json({ success: false, message: 'Error en el servidor' });
        }
      }


    
}

module.exports = new alergiaControlador();