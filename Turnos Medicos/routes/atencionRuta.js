const express= require("express");
const atencionRouter = express.Router();
const atencionControlador = require("../controllers/atencionControlador");

atencionRouter.get("/:id",atencionControlador.getAtenciones);

atencionRouter.post("/create/:id_turno",atencionControlador.createAtencion);
atencionRouter.post("/update/:id",atencionControlador.updateAtencion);
atencionRouter.post("/updateFinAtencion",atencionControlador.updateFinAtencion);
atencionRouter.get("/:id",atencionControlador.getAtencionById);
atencionRouter.post("/delete/:id",atencionControlador.deleteAtencion);
atencionRouter.get('/historial/:id_paciente/:id_agendamedico/:id_turno', atencionControlador.gethistorialPropio);
atencionRouter.get('/historialpropios/:id_paciente/:id_agendamedico', atencionControlador.gethistorialPropios);
atencionRouter.get('/historialcompleto/:id_paciente/:id_agendamedico', atencionControlador.gethistorialCompleto);



module.exports= atencionRouter;