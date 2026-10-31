const createConnection = require("../config/bd");

class Estado {
    constructor(estados)
    {

        this.estados=estados;
    }

static async get() {
    const conn = await createConnection();
    const [estados]=await conn.query('select * from estados');
    return estados;
}
static async getById(id) {
    const conn = await createConnection();
    const [estados]=await conn.query('select * from estados where id_estados=?', [id]);
    return estados;     









}
};

module.exports = Estado;
