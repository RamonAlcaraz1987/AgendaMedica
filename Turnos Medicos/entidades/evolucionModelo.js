const createConnection = require("../config/bd");

class Evolucion{
    constructor(id_entrada, descripcion){
        this.id_entrada=id_entrada;
        this.descripcion=descripcion;
    }   

    static async get(id_evoluciones){
        try{
            const conn = await createConnection();
            const [evoluciones]=await conn.query('select * from evoluciones where id_evoluciones=?', [id_evoluciones]);
            return evoluciones;
        }catch(error){
            console.log(error); 
        }


    }

    static async create(evolucion) {    
        try {
            console.log(evolucion);
            const conn = await createConnection();
            const [result] = await conn.query(
                'INSERT INTO evoluciones (id_entrada, descripcion) VALUES (?, ?)',
                [evolucion.id_entrada, evolucion.descripcion]
            );
    
            await conn.end(); // Cerrar la conexión después de la consulta
            return result.affectedRows === 1; // Devuelve true si se inserta una fila
        } catch (error) {  
            console.log(error);
            return false; // Devuelve false en caso de error
        }       
    }

static async delete(id_evoluciones){    
    try{
        const conn = await createConnection();
        const [result]=await conn.query('delete from evoluciones where id_evoluciones=?',[id_evoluciones]);
        return result.affectedRows == 1;
    }catch(error){  
        console.log(error);
    }
}

static async update(evolucion){    
    try{
        const conn = await createConnection();
        const [result]=await conn.query('update evoluciones set descripcion=? where id_evoluciones=?',[evolucion.descripcion,evolucion.id_evoluciones]);
        return result.affectedRows == 1;
    }catch(error){  
        console.log(error);
    }

}
static async get(id_entrada)
{
    try{
        const conn = await createConnection();
        const [evoluciones]=await conn.query('select * from evoluciones where id_entrada=?',[id_entrada]);
        return evoluciones;
    }catch(error){
        console.log(error); 
    }

}

static async getById(id_evoluciones){    
    try{
        const conn = await createConnection();
        const [evoluciones]=await conn.query('select * from evoluciones where id_evoluciones=?',[id_evoluciones]);
        return evoluciones;
    }catch(error){  
        console.log(error);
    }
}
}
module.exports = Evolucion