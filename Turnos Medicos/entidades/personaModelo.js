const createConnection = require("../config/bd");

class Persona{
    constructor(dni_persona,nombre,apellido,email,direccion,telefono,fecha_nac,genero){
        this.dni_persona=dni_persona;
        this.nombre=nombre;
        this.apellido=apellido;
        this.email=email;
        this.direccion=direccion;
        this.telefono=telefono;
        this.fecha_nac=fecha_nac;
        this.genero=genero;
    }
    static async get(dni_persona){

        try{
            const conn = await createConnection();
            const [personas]=await conn.query('select * from personas where dni_persona=?',[dni_persona]);
            return personas;

    }catch(error){
        console.log(error);
    }
    
        }
        static async get(){

            try{
                const conn = await createConnection();
                const [pacientes]=await conn.query('select * from personas');
                return pacientes;
    
        }catch(error){
            console.log(error);
        }
        
            }

    
    
    };

    module.exports = Persona;











