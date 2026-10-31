const createConnection = require("../config/bd");

class Diagnostico {
    constructor(id_entrada,descripcion)
    {
        this.id_entrada=id_entrada;
        this.descripcion=descripcion;   } 
        
    static async getTiposDiagnostico()
    {
        try{
            const conn = await createConnection();
            const [calidades]=await conn.query('select * from calidad_diagnostico');
            return calidades;
        }
        catch(error){
            console.log(error);
        }
    }

    static async get(id_entrada)
    {
        try{
            const conn = await createConnection();
            const [diagnosticos]=await conn.query('select * from diagnosticos where id_entrada=?',[id_entrada]);
            return diagnosticos;
        }
        catch(error){
            console.log(error);
        }
    }

    static async create(diagnostico)
    {
        try{
            const conn = await createConnection();
            const [result]=await conn.query('insert into diagnosticos (id_entrada,descripcion,id_calidad) values(?,?,(select id_calidad from calidad_diagnostico where calidad=?))',[diagnostico.id_entrada,diagnostico.descripcion,diagnostico.id_calidad]);
            await conn.end();
            return result.affectedRows == 1;
        }
        catch(error){
            console.log(error);
        }
    }
    static async getById(id_diagnostico)
    {
        try{
            const conn = await createConnection();
            const [diagnosticos]=await conn.query('select * from diagnosticos where id_diagnostico=?',[id_diagnostico]);
            return diagnosticos;
        }
        catch(error){
            console.log(error);
        }
    }   

    static async update(diagnostico)
    {
        try{
            const conn = await createConnection();
            const [result]=await conn.query('update diagnosticos set descripcion=?, id_calidad=?where id_diagnostico=?',[diagnostico.descripcion,diagnostico.id_calidad,diagnostico.id_diagnostico]);
            return result.affectedRows == 1;
        }
        catch(error){
            console.log(error);
        }
    }

    static async delete(id_diagnostico)
    {
        try{
            const conn = await createConnection();
            const [result]=await conn.query('delete from diagnosticos where id_diagnostico=?',[id_diagnostico]);
            return result.affectedRows == 1;
        }
        catch(error){
            console.log(error);
        }
    }
}

module.exports = Diagnostico;