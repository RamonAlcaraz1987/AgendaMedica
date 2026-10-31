const createConnection = require("../config/bd");


class Medico{


    constructor(dni_medico,activo){
        this.dni_medico=dni_medico;
        this.activo=activo;  
    }

static async get()
    { 
        try{
            const conn = await createConnection();
            const [medicos]=await conn.query('select * from medicos');
            return medicos;
        
        }
        catch(error){
            console.log(error);
        }

    };
    static async getById(id_medico){

        try{
            const conn = await createConnection();
            const [medicos]=await conn.query('select * from medicos where id_medico=?',[id_medico]);
            return medicos;

    }catch(error){
        console.log(error);
    }
    


    };
}
module.exports = Medico


// static async create(medico)
//     { 
//         try{
//             const conn = await createConnection();
//     const [result]=await conn.query('insert into medico (dni,nombre,apellido,especialidad) values(?,?,?,?)',[medico.dni,medico.nombre,medico.apellido,medico.especialidad]);
//     return result.affectedRows == 1;






//     }
//     catch(error){
//         console.log(error);
//     }
// }

// static async inactive(id){
//     try{
//         const conn = await createConnection();
//     const [result]=await conn.query('update medico set estado=0 where id=?',[id]);
//     return result.affectedRows == 1;
//     }
//     catch(error){
//         console.log(error);
//     }



// }