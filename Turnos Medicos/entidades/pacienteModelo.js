const createConnection = require("../config/bd");

class Paciente{
    constructor(dni_paciente,activo)
    {
        this.dni_paciente=dni_paciente;
        this.activo=activo;
    }

   

    static async getById(id_paciente){

        try{
            const conn = await createConnection();
            const [paciente]=await conn.query('select p.dni_paciente,g.nombre,g.apellido,g.email,g.direccion,g.telefono,g.fecha_nac,g.genero from pacientes p join personas g on p.dni_paciente=g.dni_persona where id_paciente=?', [id_paciente]);
            return paciente;

    }catch(error){
        console.log(error);
    }
    
        }

        static async get(){

            try{
                const conn = await createConnection();
                const [pacientes]=await conn.query('select * from pacientes');
                return pacientes.length > 0 ? pacientes[0] : null; 
    
        }catch(error){
            console.log(error);
            return null;
        }
        
            }

}

module.exports = Paciente;