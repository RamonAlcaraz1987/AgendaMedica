const createConnection = require("../config/bd");

class Alergia{


    constructor(id_entrada,nombre,importancia,fecha_desde,fecha_hasta)
    {
        this.id_entrada=id_entrada;
        this.nombre=nombre;
        this.importancia=importancia;
        this.fecha_desde=fecha_desde;
        this.fecha_hasta=fecha_hasta;
    }

    static async getTiposAlergias()
    {
        try{
            const conn = await createConnection();
            const[result]=await conn.query('select * from alergias_nomencladas');
           
            return result;
        }catch(error){
            console.log(error);
    }
    }
    static async create(alergia) {
        try {
            const conn = await createConnection(); // Estableces la conexión con la base de datos
            const [result] = await conn.query(
                'INSERT INTO alergias (id_entrada, fecha_desde, fecha_hasta, id_nomenclada) VALUES (?, ?, ?, (SELECT id_nomenclada FROM alergias_nomencladas WHERE nombre = ? LIMIT 1))',
                [alergia.id_entrada, alergia.fechaDesde, alergia.fechaHasta, alergia.tipo]
            );
            return result.affectedRows == 1;
        } catch (error) {
            console.log(error);
            throw new Error('Error al insertar la alergia');
        }
    }

    static async update(alergia)
    {
        try{
            
            const conn = await createConnection();
            const[result]=await conn.query('update alergias set fecha_desde=?,fecha_hasta=?,id_nomenclada=? where id_alergia=?',[alergia.fecha_desde,alergia.fecha_hasta,alergia.id_nomenclada,alergia.id_alergia]);
            
            return result.affectedRows == 1;
        }catch(error){
            console.log(error);
        }
    }   
    
    static async delete(id_alergia) {
        try {
          const conn = await createConnection();
          const [result] = await conn.query('DELETE FROM alergias WHERE id_alergia = ?', [id_alergia]);
          conn.end();
          return result.affectedRows === 1; // Verifica que se haya eliminado correctamente
        } catch (error) {
          console.log('Error al eliminar en la base de datos:', error);
          return false;
        }
      }

    static async get(id_entrada)
    {
        try{
            const conn = await createConnection();
            const [alergias]=await conn.query('select * from alergias where id_entrada=?',[id_entrada]);
            return alergias;
        }catch(error){
            console.log(error);
        }
    }

    static async getById(id_alergia)
    {
        try{
            const conn = await createConnection();
            const [alergias]=await conn.query('select * from alergias where id_alergia=?',[id_alergia]);
            return alergias;
        }catch(error){
            console.log(error);
        }
    }

}

module.exports = Alergia;