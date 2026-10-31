const createConnection = require("../config/bd");

class Medicamento{

    constructor(id_entrada,descripcion)
    {
        this.id_entrada=id_entrada;
        this.descripcion=descripcion;
    }
    static async get(id_entrada){
        try{
            const conn = await createConnection();
            const [medicamentos]=await conn.query('select * from medicamentos where id_entrada=?',[id_entrada]);
            return medicamentos;
        }catch(error){
            console.log(error);
        }
    }

    static async getById(id_medicamento){
        try{
            const conn = await createConnection();
            const [medicamentos]=await conn.query('select * from medicamentos where id_medicamento=?',[id_medicamento]);
            return medicamentos;
        }catch(error){
            console.log(error);
        }
    }

    static async create(medicamento){
        try{
            const conn = await createConnection();
            const [result]=await conn.query('insert into medicamentos (id_entrada,descripcion) values(?,?)',[medicamento.id_entrada,medicamento.descripcion]);
            return result.affectedRows == 1;
        }catch(error){
            console.log(error);
            
        }
    }   

    static async update(medicamento){
        try{
            const conn = await createConnection();
            const [result]=await conn.query('update medicamentos set descripcion=? where id_medicamento=?',[medicamento.descripcion,medicamento.id_medicamento]);
            return result.affectedRows == 1;
        }catch(error){
            console.log(error);
        }
    }   

    static async delete(id_medicamento){
        try{
            const conn = await createConnection();
            const [result]=await conn.query('delete from medicamentos where id_medicamento=?',[id_medicamento]);
            return result.affectedRows == 1;
        }catch(error){
            console.log(error);
        }
    }   

}

module.exports = Medicamento;