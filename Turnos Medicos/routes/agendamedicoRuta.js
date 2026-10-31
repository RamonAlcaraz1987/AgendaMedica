const express = require("express");
const agendamedicoRouter = express.Router();
const agendamedicoControlador = require("../controllers/agendamedicoControlador");

agendamedicoRouter.get("/",agendamedicoControlador.getAgendamedico);
agendamedicoRouter.get("/:id",agendamedicoControlador.getAgendamedicoById);


module.exports= agendamedicoRouter;

