const bcrypt = require('bcrypt');
const createConnection = require('./config/bd'); 

const hashearPassword = async () => {
    const plainPassword = process.argv[2];
    if (!plainPassword) {
        console.log("Uso: node hashpassword.js <contraseña>");
        process.exit(1);
    }  
    const hashedPassword = bcrypt.hashSync(plainPassword, 10);  

    const connection = await createConnection();

    try {
        
        await connection.query(
            "UPDATE usuarios SET password = ? WHERE usuario = 'Ralcaraz'", 
            [hashedPassword]
        );
        console.log('Contraseña hasheada y actualizada correctamente');
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
    } finally {
        await connection.end();
    }
};


hashearPassword();