const express= require("express");
const personaRouter = express.Router(); 
const personaControlador = require("../controllers/personaControlador");


personaRouter.get("/",personaControlador.getPersonas);

personaRouter.get("/:id",personaControlador.getPersonaById);



module.exports= personaRouter;


