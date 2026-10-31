const createConnection = require("../config/bd");

class AgendaMedico{

    constructor(especialidad,matricula,id_medico)
    {   
        this.especialidad=especialidad;
        this.matricula=matricula;
        this.id_medico=id_medico;


    }

    static async getPlantillas(id_agendamedico){
        try{
            const conn = await createConnection();
           
            const [plantillas]=await conn.query('select * from plantilla where id_agendamedico=?',[id_agendamedico]);
            return plantillas;
        }catch(error){
            console.log(error);
        }
        

    }

    static async get(){
        try{
            const conn = await createConnection();
            const [agendamedicos]=await conn.query('select * from agendamedicos');
            return agendamedicos;
        }catch(error){
            console.log(error);
        }
    }

    static async getById(id_agendamedico){
        try{
            const conn = await createConnection();
            const [agendamedicos]=await conn.query('select * from agendamedicos where id_agendamedico=?',[id_agendamedico]);
            return agendamedicos;
        }catch(error){  
            console.log(error);
        }
    }




}

module.exports=AgendaMedico;