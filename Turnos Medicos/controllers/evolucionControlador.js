const Evolucion = require("../entidades/evolucionModelo");

class EvolucionControlador {
    async getEvoluciones(req, res) {
        try {
            const evoluciones = await Evolucion.get();
            res.render("views/evolucion", { evoluciones: evoluciones });
        } catch (error) {
            console.log(error);
        }
    }

    async getEvolucionById(req, res) {
        try {
            const id = req.params.id;
            const evoluciones = await Evolucion.getById(id);
            res.render("views/evolucion", { evoluciones: evoluciones });
        } catch (error) {
            console.log(error);
        }
    }

    async createEvolucion(req, res) {
        try {
            const evolucion = req.body;
            console.log(evolucion);
            const result = await Evolucion.create(evolucion);
            
            if (result) {
                res.status(200).json({ message: "Evolución creada correctamente" });
            } else {
                res.status(500).json({ message: "Error al crear la evolución" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error en el servidor al crear la evolución" });
        }
    }

    async updateEvolucion(req, res) {
        try {
            const evoluciones = await Evolucion.update(req.body);
            res.send('evoluciones actualizado');
        } catch (error) {
            console.log(error);
        }
    }

    async deleteEvolucion(req, res) {
        try {
            const id = req.params.id;
            const evoluciones = await Evolucion.delete(id);
            res.render("views/evolucion", { evoluciones: evoluciones });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new EvolucionControlador();