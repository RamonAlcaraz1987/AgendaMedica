const Atencion = require('../entidades/atencionModelo');
const Paciente = require('../entidades/pacienteModelo');
const Alergia = require('../entidades/alergiaModelo');
const Evolucion = require('../entidades/evolucionModelo');
const Antecedente = require('../entidades/antecedenteModelo');
const Medicamento = require('../entidades/medicamentoModelo');
const Habito = require('../entidades/habitoModelo');
const Diagnostico = require('../entidades/diagnosticoModelo');
const AlergiaControlador = require("../controllers/alergiaControlador");
const diagnosticoControlador = require("../controllers/diagnosticoControlador");
const agendamedicoControlador = require("../controllers/agendamedicoControlador");

class AtencionControlador {

    async getAtenciones(req, res) {
        try {
            
            const idUltimaEntrada = await Atencion.get(req.params.id,req.session.id_agendamedico); 
            const fechaAtencion1 = await Atencion.update(idUltimaEntrada);
            const fechaAtencion = new Date(fechaAtencion1);
            
            
            const alergias = await Alergia.get(idUltimaEntrada);
            console.log('Alergias:', alergias);
            alergias.forEach(alergia => {
                alergia.fecha_desde = alergia.fecha_desde ? new Date(alergia.fecha_desde).toISOString().split('T')[0] :''; // Convierte a 'YYYY-MM-DD'
                alergia.fecha_hasta = alergia.fecha_hasta ? new Date(alergia.fecha_hasta).toISOString().split('T')[0] :''; // Convierte a 'YYYY-MM-DD'
            });
            console.log('Alergias:', alergias);
            const evoluciones = await Evolucion.get(idUltimaEntrada);
            const antecedentes = await Antecedente.get(idUltimaEntrada);
            antecedentes.forEach(antecedente => {
                antecedente.fecha_desde = antecedente.fecha_desde ? new Date(antecedente.fecha_desde).toISOString().split('T')[0]:''; // Convierte a 'YYYY-MM-DD'
                antecedente.fecha_hasta = antecedente.fecha_hasta ? new Date(antecedente.fecha_hasta).toISOString().split('T')[0]:''; // Convierte a 'YYYY-MM-DD'
            })
            const medicamentos = await Medicamento.get(idUltimaEntrada);
            const habitos = await Habito.get(idUltimaEntrada);
            habitos.forEach(habito => {
                habito.fecha_desde = habito.fecha_desde ? new Date(habito.fecha_desde).toISOString().split('T')[0]:''; // Convierte a 'YYYY-MM-DD'
                habito.fecha_hasta = habito.fecha_hasta ? new Date(habito.fecha_hasta).toISOString().split('T')[0]:''; // Convierte a 'YYYY-MM-DD'
            })
            const diagnosticos = await Diagnostico.get(idUltimaEntrada);
            const tiposAlergias = await AlergiaControlador.getAlergiasNomencladas(req, res);
            console.log(tiposAlergias);
            const tiposDiagnostico =await Diagnostico.getTiposDiagnostico();

            console.log('Alergias:', alergias);
            console.log('Antecedentes:', antecedentes);

            res.render('ultimaAtencion', { 
                idUltimaEntrada,
                alergias, 
                evoluciones, 
                antecedentes, 
                medicamentos, 
                habitos, 
                diagnosticos,
                tiposAlergias,
                tiposDiagnostico,
                fechaAtencion
            });
        } catch (error) {
            console.log(error);
            console.log('Alergias:', alergias);
            
        }
    }

    async getAtencionById(req, res) {
        try {
            
            const id = req.params.id;
            const atenciones = await Atencion.getById(id);
            res.render('/atenciones', { atenciones: atenciones });
        } catch (error) {
            console.log(error);
        }
    }


    async gethistorialCompleto(req, res) {
        try {
            const id_paciente = req.params.id_paciente;
            const id_agendamedico = req.params.id_agendamedico;
            const atenciones = await Atencion.gethistorialCompleto(id_agendamedico,id_paciente);

            res.render('historialCompleto', { atenciones: atenciones || [] });
        } catch (error) {
            console.log(error);
            res.status(500).send('Error al obtener atenciones');
        }
    }   

            


    async gethistorialPropio(req, res) {
        try {
            const id_paciente = req.params.id_paciente;
            const id_agendamedico = req.params.id_agendamedico;
            const id_turno = req.params.id_turno;
            const tiposAlergias = await AlergiaControlador.getAlergiasNomencladas(req, res);
            const TiposCalidades = await diagnosticoControlador.getCalidadesDiagnostico(req, res);
            const plantillas = await agendamedicoControlador.getPlantilla(req, res);

            
            console.log(TiposCalidades);
            
            const atenciones = await Atencion.gethistorialPropio(id_agendamedico,id_paciente);
            const pacientes = await Paciente.getById(id_paciente);
            const atencionCrear= await Atencion.create(id_turno);
            const atencionAct= await Atencion.getById(id_turno);
            const atencionActual = atencionAct[0];
            const paciente =pacientes[0];

            
            if(!paciente || paciente.length == 0){
                return res.status(404).send('No se encontraron pacientes');
            } 
            
           
           res.render('historial', { id_paciente, id_agendamedico,paciente, atenciones: atenciones || [], atencionActual, tiposAlergias, TiposCalidades, plantillas, id_turno });
           
        } catch (error) {
            console.log(error);
            res.status(500).send('Error al obtener atenciones');
        }
    }
    async gethistorialPropios(req, res) {
        try {
            const id_paciente = req.params.id_paciente;
            const id_agendamedico = req.params.id_agendamedico;
            
            
            
            const atenciones = await Atencion.gethistorialPropio(id_agendamedico,id_paciente);
            const pacientes = await Paciente.getById(id_paciente);
            const paciente =pacientes[0];
            if(!paciente || paciente.length == 0){
                return res.status(404).send('No se encontraron pacientes');
            }
            res.render('misatenciones', { paciente, atenciones: atenciones || [] });
        } catch (error) {
            console.log(error);
            res.status(500).send('Error al obtener atenciones');
        }
    }

    async createAtencion(req, res) {
        try {
            const atenciones = await Atencion.create(req.body);
            res.redirect('/atenciones');
            
        } catch (error) {
            console.log(error);
        }       

    }

    async updateAtencion(req, res) {
        try {
            const id = req.params.id;
            const atenciones = await Atencion.update(id, req.body);
            res.redirect('/atenciones');
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAtencion(req, res) {
        try {
            const id = req.params.id;
            const atenciones = await Atencion.delete(id);
            res.redirect('/atenciones');
        } catch (error) {
            console.log(error);
        }
    }
    updateFinAtencion(req, res) {
        try {
            const id = req.body.id_entrada;
            const atenciones = Atencion.updateFinAtencion(id);
            res.redirect('turnos/deldia');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AtencionControlador();
