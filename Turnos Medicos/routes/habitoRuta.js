const express= require("express");
const habitoRouter = express.Router();
const habitoControlador = require("../controllers/habitoControlador");

habitoRouter.get("/",habitoControlador.getHabitos);
habitoRouter.post("/create",habitoControlador.createHabito);
habitoRouter.post("/update",habitoControlador.updateHabito);
habitoRouter.get("/:id",habitoControlador.getHabitoById);
habitoRouter.delete("/delete/:id",habitoControlador.deleteHabito);


module.exports= habitoRouter;