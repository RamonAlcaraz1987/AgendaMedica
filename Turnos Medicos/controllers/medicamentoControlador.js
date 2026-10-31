const Medicamento = require('../entidades/medicamentoModelo');

class MedicamentoControlador{

    async getMedicamentos(req,res){
        try
        {
            const medicamentos = await Medicamento.get();
            res.render('views/medicamento', {medicamentos: medicamentos});
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async getMedicamentoById(req,res){
        try
        {
            const id = req.params.id;
            const medicamento = await Medicamento.getById(id);
            res.render('views/medicamento', {medicamentos: medicamentos});
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async createMedicamento(req,res){
        try
        {
            const medicamento = req.body;
            await Medicamento.create(medicamento);
            res.send('Medicamento creado');
        }
        catch(error)
        {
            console.log(error);
            res.status(500).send('Error al crear el medicamento');
        }
    }

    async updateMedicamento(req,res){
        try
        {
            const medicamento = req.body;
            await Medicamento.update(medicamento);
            res.send('Medicamento actualizado');
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async deleteMedicamento(req,res){
        try
        {
            const id = req.params.id;
            const result = await Medicamento.delete(id);
            res.redirect('/medicamentos');
        }
        catch(error)
        {
            console.log(error);
        }
    }
}

module.exports = new MedicamentoControlador();