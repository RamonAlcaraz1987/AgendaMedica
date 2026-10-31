const express= require("express");
const pacienteRouter = express.Router();
const pacienteControlador = require("../controllers/pacienteControlador");

pacienteRouter.get("/",pacienteControlador.getPacientes);

pacienteRouter.get("/historial/:id",pacienteControlador.getPacienteById);


module.exports= pacienteRouter;