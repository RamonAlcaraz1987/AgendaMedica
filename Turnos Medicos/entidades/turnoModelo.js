const createConnection = require("../config/bd");

class Turno{
    constructor(id_agendamedico,id_paciente,fecha_turno,horario,motivo_consulta,id_estados){
        this.id_agendamedico=id_agendamedico;
        this.id_paciente=id_paciente;   
        this.fecha_turno=fecha_turno;
        this.horario=horario;
        this.motivo_consulta=motivo_consulta;
        this.id_estados=id_estados;      
}  

static async getTurnosDelDia(id_agendamedico) {
    try {
        const conn = await createConnection();
        const [turnos] = await conn.query(`
            SELECT 
                DATE_FORMAT(t.fecha_turno, '%d-%m-%Y') AS fecha,
                t.horario,
                t.motivo_consulta,
                p.dni_paciente,
                pe.nombre,
                pe.apellido,
                x.estado,
                t.id_paciente,
                a.id_entrada,
                t.id_turno
            FROM 
                turnos t
            JOIN
                estados x ON t.id_estados = x.id_estados
            JOIN 
                pacientes p ON t.id_paciente = p.id_paciente
            JOIN 
                personas pe ON p.dni_paciente = pe.dni_persona
            LEFT JOIN
                antecedentes a ON t.id_turno = a.id_entrada
            WHERE 
                DATE(t.fecha_turno) = CURDATE()
                AND t.id_agendamedico = ?
            ORDER BY 
                t.horario
        `, [id_agendamedico]);

        return turnos || [];  
    } catch (error) {
        console.log(error);
        return [];         
    }
}
static async getTurnosPasadosPorFecha(id_agendamedico, fecha) {
    try {
        const conn = await createConnection();
        const [turnos] = await conn.query(`
              SELECT 
                DATE_FORMAT(t.fecha_turno, '%d-%m-%Y') AS fecha,
                t.horario,
                t.motivo_consulta,
                p.dni_paciente,
                pe.nombre,
                pe.apellido,
                x.estado,
                t.id_paciente
            FROM 
                turnos t
            JOIN
                estados x ON t.id_estados = x.id_estados
            JOIN 
                pacientes p ON t.id_paciente = p.id_paciente
            JOIN 
                personas pe ON p.dni_paciente = pe.dni_persona
            WHERE 
                DATE(t.fecha_turno) = ? AND 
                t.id_agendamedico = ?
            ORDER BY 
                t.horario`, [fecha, id_agendamedico]);
        return turnos || [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

static async getTurnosPasados(id_agendamedico){
    try{
        const conn = await createConnection ();
        const [turnos]=await conn.query( `SELECT 
            
            DATE_FORMAT(t.fecha_turno, '%d-%m-%Y') AS fecha,
            t.horario,
            t.motivo_consulta,
            p.dni_paciente,
            pe.nombre,
            pe.apellido,
            x.estado,
            t.id_paciente
        FROM 
            turnos t
        JOIN
            estados x ON t.id_estados = x.id_estados
        JOIN 
            pacientes p ON t.id_paciente = p.id_paciente
        JOIN 
            personas pe ON p.dni_paciente = pe.dni_persona
        WHERE 
            DATE(t.fecha_turno) < CURDATE()
            AND t.id_agendamedico = ?
        ORDER BY 
            t.horario`, [id_agendamedico]); 
        return turnos|| [];  
    }catch(error){
        console.log(error);
        return[];         
    }   
}

 static async getTurnosFuturos(id_agendamedico){
    try{
        const conn = await createConnection ();
        const [turnos]=await conn.query( `SELECT 
            
            DATE_FORMAT(t.fecha_turno, '%d-%m-%Y') AS fecha,
            t.horario,
            t.motivo_consulta,
            p.dni_paciente,
            pe.nombre,
            pe.apellido,
            x.estado,
            t.id_paciente
            
        FROM 
            turnos t
        JOIN
            estados x ON t.id_estados = x.id_estados
        JOIN 
            pacientes p ON t.id_paciente = p.id_paciente
        JOIN 
            personas pe ON p.dni_paciente = pe.dni_persona
        WHERE 
            DATE(t.fecha_turno) > CURDATE()
            AND t.id_agendamedico = ?
        ORDER BY 
            t.horario`, [id_agendamedico]); 
        return turnos|| [];  
    }catch(error){
        console.log(error);
        return[];         
    }
 }
static async get(){
    try{
        const conn = await createConnection ();
        const [turnos]=await conn.query('select * from turnos'); 
        return turnos;  
    }catch(error){
        console.log(error);         
    }

}   
    static async getById(id_turno){
        try{
            const conn = await createConnection ();
            const [turnos]=await conn.query('select * from turnos where id_turno=?', [id_turno]); 
            return turnos;  
        }catch(error){
            console.log(error);         
        }
    
    }

    static async updateEnAtencion(id_paciente){ 
        try{
            const conn = await createConnection ();
            const [turnos]=await conn.query('update turnos set id_estados = 2 where id_turno = ?', [id_paciente]);
            return turnos;  
        }catch(error){
            console.log(error);         
        }
    
    }

    static async updateFinalizado(id_turno) {
        try {
            const conn = await createConnection();
            console.log("Ejecutando UPDATE para id_turno:", id_turno); // Log de depuración
            
            const [result] = await conn.query(
                'UPDATE turnos SET id_estados = 3 WHERE id_turno = ?',
                [id_turno]
            );
            
            console.log("Resultado de actualización SQL:", result); // Verificar resultado de SQL
            return result;
        } catch (error) {
            console.log("Error en updateFinalizado:", error);
            throw error;
        }
    }


}

module.exports = Turno;