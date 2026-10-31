const Estado = require("../entidades/estadoModelo");

class EstadoControlador {
    async getEstados(req, res) {
        try {
            const estados= await Estado.get();
            res.render('views/estados', {estados: estados});
        } catch (error) {
            console.log(error);
        }
    }

    async getEstadoById(req, res) {
        try {
            const id = req.params.id;
            const estado = await Estado.getById(id);
            res.render('views/estados', {estado: estado});
        } catch (error) {
            console.log(error);
        }
    }

    


}
module.exports = new EstadoControlador();