const Paciente = require("../entidades/pacienteModelo");

class PacienteControlador {
    async getPacientes(req, res) {
        try {
            const pacientes = await Paciente.get();
            res.render("views/agenda", { pacientes: pacientes });
        } catch (error) {
            console.log(error);
        }
    }

    async getPacienteById(req, res) {
        try {
            const id = req.params.id;
            const pacientes = await Paciente.getById(id);
            const paciente = pacientes.length > 0 ? pacientes[0] : null;
            
            res.render("historial", { paciente: paciente });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new PacienteControlador();