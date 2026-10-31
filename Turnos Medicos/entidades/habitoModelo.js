const createConnection = require("../config/bd");

class habito{
    constructor(id_entrada,descripcion,fecha_desde,fecha_hasta)
    {
        this.id_entrada = id_entrada;
        
        this.descripcion = descripcion;
        this.fecha_desde = fecha_desde;
        this.fecha_hasta = fecha_hasta;
    }

    static async get(id_entrada){
        try{
            const conn = await createConnection();
            const [habitos]=await conn.query('select * from habitos where id_entrada=?',[id_entrada]);
            return habitos;
        }catch(error){
            console.log(error);
        }
    }

    static async getById(id_habitos){
        try{
            const conn = await createConnection();
            const [habitos]=await conn.query('select * from habitos where id_habitos=?',[id_habitos]);
            return habitos;     
        }catch(error){
            console.log(error);
        }
      
}
    static async create(habito){
        try{
            const conn = await createConnection();
            const [result]=await conn.query('insert into habitos (id_entrada,descripcion,fecha_desde,fecha_hasta) values(?,?,?,?)',
            [habito.id_entrada,habito.descripcion,habito.fechaDesde,habito.fechaHasta]);
            return result.affectedRows == 1;
        }catch(error){
            console.log(error);
        }
    }   

    static async update(habito){
        try{
            const conn = await createConnection();
            const [result]=await conn.query('update habitos set descripcion=?,fecha_desde=?,fecha_hasta=? where id_habito=?',
            [habito.descripcion,habito.fecha_desde,habito.fecha_hasta,habito.id_habito]);
            return result.affectedRows == 1;
        }catch(error){
            console.log(error);
        }
    }

    static async delete(id_habito){
        try{
            const conn = await createConnection();
            const [result]=await conn.query('delete from habitos where id_habito=?', [id_habito]);
            return result.affectedRows == 1;
        }catch(error){
            console.log(error);
        }
    }
    };

    module.exports = habito;