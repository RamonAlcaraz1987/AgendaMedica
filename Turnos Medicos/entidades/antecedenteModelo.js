const createConnection = require("../config/bd");


class Antecedente{

    constructor(id_entrada,descripcion,fecha_desde,fecha_hasta)
    {
        this.id_entrada=id_entrada;
        this.descripcion=descripcion;
        this.fecha_desde=fecha_desde;
        this.fecha_hasta=fecha_hasta;

    }


    static async get(id_entrada)
    {
        try{
            const conn = await createConnection();
            const [antecedentes]=await conn.query('select * from antecedentes where id_entrada=?', [id_entrada]);
            return antecedentes;
        }
        catch(error){
            console.log(error);
        }    
    }   

    static async create(antecedente)
    {
        try{
            const conn = await createConnection();
            const [result]=await conn.query('insert into antecedentes (id_entrada,descripcion,fecha_desde,fecha_hasta) values (?,?,?,?)',
            [antecedente.id_entrada,antecedente.descripcion,antecedente.fechaDesde,antecedente.fechaHasta]);
            return result.affectedRows == 1;
        }
        catch(error){
            console.log(error);
        }
    }

    static async getById(id)
    {
        try{
            const conn = createConnection();
            const [antecedentes]=await conn.query('select * from antecedentes where id_antecedentes=?', [id]);
            return antecedentes;
        }
        catch(error){
            console.log(error);
        }
    }

     static async update(antecedente)
    {
        try{
            const conn = await createConnection();
            const [result]=await conn.query('update antecedentes set descripcion=?,fecha_desde=?,fecha_hasta=? where id_antecedentes=?',
            [antecedente.descripcion, antecedente.fecha_desde,antecedente.fecha_hasta,antecedente.id_antecedentes]);
            return result.affectedRows == 1;
        }
        catch(error){    
            console.log(error);
        }
    }           
    static async delete(id_antecedentes)
    {
        try{
            const conn = await createConnection();
            const [result]=await conn.query('delete from antecedentes where id_antecedentes=?', [id_antecedentes]);
            return result.affectedRows == 1;
        }
        catch(error){
            console.log(error);
        }

    }
  






}

module.exports = Antecedente;