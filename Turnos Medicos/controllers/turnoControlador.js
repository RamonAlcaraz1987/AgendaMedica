const Turno = require("../entidades/turnoModelo");

class TurnoControlador {

    async getTurnos(req, res) {
        try {
            const turnos = await Turno.get();
           
            res.render('turnos', {turnos: turnos});
        } catch (error) {
            console.log(error);
            res.status(500).send('Error al obtener los turnos');
        }
    }
   
    async getTurnosDelDia(req, res) {
        try {const id_agendamedico = req.session.id_agendamedico;
            const turnos = await Turno.getTurnosDelDia(id_agendamedico);
           
            res.render('delDia', {turnos: turnos|| [], id_agendamedico});
        } catch (error) {
            console.log(error);
            res.status(500).send('Error al obtener los turnos del día');
        }
    }

    async getTurnosPasados(req, res) {
        try {
            const id_agendamedico = req.session.id_agendamedico; 
            const fechaSeleccionada = req.query.fecha; 
            console.log(`Fecha seleccionada: ${fechaSeleccionada}`);
            const turnos = await Turno.getTurnosPasadosPorFecha(id_agendamedico, fechaSeleccionada);
    
            res.render('pasados', {
                turnos: turnos || [],
                id_agendamedico
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Error al obtener los turnos pasados');
        }
    }

    async getTurnosFuturos(req, res) {
        try {const id_agendamedico = 2;
            const turnos = await Turno.getTurnosFuturos(id_agendamedico);
           
            res.render('futuros', {turnos: turnos|| []});
        } catch (error) {
            console.log(error);
            res.status(500).send('Error al obtener los turnos futuros');
        }
    }

     async getTurnoById(req, res) {
        try {
            const id = req.params.id;
            const turno = await Turno.getById(id);
            res.render('turnossss', {turno: turno});
        } catch (error) {
            console.log(error);
        }
    }

    async createTurno(req, res) {
        try {
            const turno = req.body;
            const result = await Turno.create(turno);
            res.redirect('/turnos');
        } catch (error) {
            console.log(error);
        }
    }

    async updateTurno(req, res) {
        try {
            const id = req.params.id;
            const turno = req.body;
            const result = await Turno.update(id, turno);
            res.redirect('/turnos');
        } catch (error) {
            console.log(error);
        }
    }

    async updateFinalizado(req, res) {
        try {
            console.log("Cuerpo de la solicitud:", req.body);
            const { id_turno } = req.body;  // Asegúrate de que estamos recibiendo el id_turno del cuerpo de la solicitud
            console.log("ID recibido en updateFinalizado:", id_turno);  // Verifica que estamos recibiendo el valor
    
            const result = await Turno.updateFinalizado(id_turno);
            console.log('Resultado de la actualización de turno:', result);
            
            res.send('Turno finalizado');
        } catch (error) {
            console.log(error);
            res.status(500).send('Error al actualizar el turno');
        }
    }

    async updateEnAtencion(req, res) {
        try {
            const {id_paciente, id_agendamedico, id_turno} = req.params;
            console.log(id_paciente, id_agendamedico);
             await Turno.updateEnAtencion(id_turno);
            res.redirect(`/atenciones/historial/${id_paciente}/${id_agendamedico}/${id_turno}`);
        } catch (error) {
            console.log(error);
           
        }
    }

    async deleteTurno(req, res) {
        try {
            const id = req.params.id;
            const result = await Turno.delete(id);
            res.redirect('/turnos');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new TurnoControlador();