const Medico = require('../entidades/medicoModelo');


class MedicoControlador{
async getMedicos(req,res){
    try{

        const medicos = await Medico.get(); 
        res.render('views/agenda', {medicos: medicos}); 
    }catch(error){
        console.log(error);
    }
}

async getMedicoById(req,res){
    try{
        const id = req.params.id;
        const medico = await Medico.getById(id);
        res.render('views/agenda', {medico: medico});
    }catch(error){
        console.log(error);
    }
}

// async createMedico(req,res){
//     try{
//         const medico = req.body;
//         const result = await Medico.create(medico);
//         res.redirect('/medicos');
//     }catch(error){
//         console.log(error);
//     }
// }

// async updateMedico(req,res){
//     try{
//         const medico = req.body;
//         const result = await Medico.update(medico);
//         res.redirect('/medicos');
//     }catch(error){
//         console.log(error);
//     }
// }




}

module.exports = new MedicoControlador();




























// class MedicoController{
//     async index (req,res){
//         const medicos = await Medico.get();

//         if (req.query.nombre){
//             res.render('views/agenda', {medicos: medicos, nombre: nombre});


//         }else{

//             res.render('views/agenda', {medicos: medicos});

//         }



//     }
//     store (req,res){
//        const nombre = req.body.nombre;
//        const mail = req.body.mail;
//        const especialidad = req.body.especialidad;
//        if(Medico.create({nombre,mail,especialidad}))
//        {


//        }
//        else{
//         res.render('views/agenda', {medicos: medicos});
        

//        };
//     }

//     editar(req,res){
//         res.render  ('views/agenda');
//     };

//     async update(req,res){
//     };

//     async inactivate(req,res){
//         const id =req.params.id;
//        if(await Medico.inactivate(id))
//        {}
//        else{};

//     };

//     async activate(req,res){
//     };
// }
// module.exports = new MedicoController();