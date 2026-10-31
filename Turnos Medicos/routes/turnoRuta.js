const express= require("express");
const turnoRouter = express.Router();
const turnoControlador = require("../controllers/turnoControlador");

turnoRouter.get("/turnos",turnoControlador.getTurnos);
turnoRouter.post("/create",turnoControlador.createTurno);
turnoRouter.post("/update/:id",turnoControlador.updateTurno);
turnoRouter.get("/turnos/:id",turnoControlador.getTurnoById);
turnoRouter.post("/delete/:id",turnoControlador.deleteTurno);
turnoRouter.get("/deldia",turnoControlador.getTurnosDelDia);
turnoRouter.get("/pasados",turnoControlador.getTurnosPasados);
turnoRouter.get("/futuros",turnoControlador.getTurnosFuturos);
turnoRouter.get('/enAtencion/:id_paciente/:id_agendamedico/:id_turno', turnoControlador.updateEnAtencion);
turnoRouter.post('/finalizado', turnoControlador.updateFinalizado);

module.exports= turnoRouter;