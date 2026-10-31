const express= require("express");
const diagnosticoRouter = express.Router();
const diagnosticoControlador = require("../controllers/diagnosticoControlador");

diagnosticoRouter.get("/",diagnosticoControlador.getDiagnostico);
diagnosticoRouter.post("/create",diagnosticoControlador.createDiagnostico);
diagnosticoRouter.post("/update",diagnosticoControlador.updateDiagnostico);
diagnosticoRouter.get("/:id",diagnosticoControlador.getDiagnosticoById);
diagnosticoRouter.delete("/delete/:id",diagnosticoControlador.deleteDiagnostico);


module.exports= diagnosticoRouter;