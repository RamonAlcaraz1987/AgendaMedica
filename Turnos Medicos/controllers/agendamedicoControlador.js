const Agendamedico = require('../entidades/agendamedicoModelo');

class AgendamedicoControlador {


    async getPlantilla(req, res) {
        try {
            const id_agendamedico = req.session.id_agendamedico;
            const plantillas = await Agendamedico.getPlantillas(id_agendamedico);       
            return plantillas|| [];
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getAgendamedico(req, res) {
        try {
            const agendamedicos = await Agendamedico.get();
            res.render('views/agenda', {agendamedicos: agendamedicos});
        } catch (error) {
            console.log(error);
        }
    }

    async getAgendamedicoById(req, res) {
        try {
            const id = req.params.id;
            const agendamedico = await Agendamedico.getById(id);
            res.render('views/agenda', {agendamedico: agendamedico});
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new AgendamedicoControlador();
