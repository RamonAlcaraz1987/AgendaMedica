const express= require("express");
const medicamentoRouter = express.Router();
const medicamentoControlador = require("../controllers/medicamentoControlador");

medicamentoRouter.get("/",medicamentoControlador.getMedicamentos);
medicamentoRouter.post("/create",medicamentoControlador.createMedicamento);
medicamentoRouter.post("/update",medicamentoControlador.updateMedicamento);
medicamentoRouter.get("/:id",medicamentoControlador.getMedicamentoById);
medicamentoRouter.delete("/delete/:id",medicamentoControlador.deleteMedicamento);


module.exports= medicamentoRouter;