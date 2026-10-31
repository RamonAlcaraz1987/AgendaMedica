require("dotenv").config();
const express = require("express");
const pug = require("pug");
const mysql=require("mysql2");
const bodyParser = require("body-parser");
const session =require("express-session");
const path = require("path");

const app= express();
app.use(express.json());


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 }
}))

app.get("/", (req, res) => {
    res.redirect("/login");
  });

const authRuta = require("./routes/authRuta");
const medicoRuta = require("./routes/medicoRuta.js");
const diagnosticoRuta = require("./routes/diagnosticoRuta");
const medicamentoRuta = require("./routes/medicamentoRuta");
const alergiaRuta = require("./routes/alergiaRuta");
const personaRuta = require("./routes/personaRuta");
const pacienteRuta = require("./routes/pacienteRuta");
const turnoRuta = require("./routes/turnoRuta");
const agendamedicoRuta = require("./routes/agendamedicoRuta");
const atencionRuta = require("./routes/atencionRuta");
const usuarioRuta = require("./routes/usuarioRuta");
// const loginRuta = require("./routes/loginRuta");
const antecedenteRuta = require("./routes/antecedenteRuta");
const estadoRuta = require("./routes/estadoRuta");
const evolucionRuta = require("./routes/evolucionRuta");
const habitoRuta = require("./routes/habitoRuta");
const conn = require('./config/bd');




app.set("view engine", "pug");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/", authRuta);
app.use("/medicos", medicoRuta);
app.use("/medicamentos", medicamentoRuta);
app.use("/alergias", alergiaRuta);
app.use("/atenciones", atencionRuta);
app.use("/pacientes", pacienteRuta);
app.use("/turnos", turnoRuta);  
app.use("/agendamedicos", agendamedicoRuta);
app.use("/usuarios", usuarioRuta);
// app.use("/login", loginRuta);
app.use("/antecedentes", antecedenteRuta);
app.use("/estados", estadoRuta);
app.use("/evoluciones", evolucionRuta);
app.use("/habitos", habitoRuta);
app.use("/diagnosticos", diagnosticoRuta);
app.use("/personas",personaRuta);










const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});