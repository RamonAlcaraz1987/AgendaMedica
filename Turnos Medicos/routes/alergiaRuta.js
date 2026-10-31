const express= require("express");
const alergiaRouter = express.Router();
const alergiaControlador = require("../controllers/alergiaControlador");

alergiaRouter.get("/",alergiaControlador.getAlergias);
alergiaRouter.post("/create",alergiaControlador.createAlergia);
alergiaRouter.post("/update",alergiaControlador.updateAlergia);
alergiaRouter.get("/:id",alergiaControlador.getAlergiaById);
alergiaRouter.delete("/delete/:id",alergiaControlador.deleteAlergia);


module.exports= alergiaRouter;
