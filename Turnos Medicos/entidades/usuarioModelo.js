const createConnection = require("../config/bd");

class Usuario{

    constructor(password,usuario,activo,id_medico)
    {

        this.password=password;
        this.usuario=usuario;
        this.activo=activo;
        this.id_medico=id_medico;
    }

    static async get()
    {
        try{
            const conn = await createConnection();
            const [usuarios]=await conn.query('select * from usuario');
            return usuarios;
        
        }catch(error){
            console.log(error);
        }
    }

    static async getById(id)
    {
        try{
            const conn = await createConnection();
            const [usuarios]=await conn.query('select * from usuario where id_usuario=?',[id]);
            return usuarios;
        
        }catch(error){
            console.log(error);
        }
    }







};
module.exports = Usuario;