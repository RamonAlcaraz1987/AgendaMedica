const express = require("express");
const authRouter = express.Router();
const createConnection = require("../config/bd");
const bcrypt = require("bcrypt");

authRouter.get("/login", (req, res) => {
    const errorMessage = req.session.errorMessage;
    req.session.errorMessage = null; // Limpiar mensaje de error después de usarlo
    res.render("login", { errorMessage });
});

authRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const connection = await createConnection();
        const [results] = await connection.query(
            "SELECT * FROM usuarios WHERE usuario = ?",
            [username]
        );

        console.log('Resultados de la consulta:', results);

        if (results.length === 0) {
            req.session.errorMessage = "Usuario no encontrado";
            return res.redirect("/login");
        } else {
            const user = results[0];
            
            const isMatch = await bcrypt.compare(password, user.password);
            
            if (isMatch) {
                req.session.user = user;
                req.session.id_agendamedico = user.id_agendamedico;
                return res.redirect("/turnos/deldia");
            } else {
                req.session.errorMessage = "Contraseña incorrecta";
                return res.redirect("/login");
            }
        }
    } catch (err) {
        console.error("Error al obtener el usuario:", err);
        req.session.errorMessage = "Error al obtener el usuario";
        return res.redirect("/login");
    }
});
    

authRouter.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});


module.exports = authRouter;