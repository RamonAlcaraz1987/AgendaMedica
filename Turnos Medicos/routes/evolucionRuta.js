const express= require("express");
const evolucionRouter = express.Router();   
const evolucionControlador = require("../controllers/evolucionControlador");

evolucionRouter.get("/",evolucionControlador.getEvoluciones);
evolucionRouter.post("/create",evolucionControlador.createEvolucion);
evolucionRouter.post("/update",evolucionControlador.updateEvolucion);
evolucionRouter.get("/:id",evolucionControlador.getEvolucionById);
evolucionRouter.delete("/delete/:id",evolucionControlador.deleteEvolucion);


module.exports= evolucionRouter;