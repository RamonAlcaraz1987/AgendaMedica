const express= require("express");
const estadoRouter = express.Router();
const estadoControlador = require("../controllers/estadoControlador");

estadoRouter.get("/",estadoControlador.getEstados);

estadoRouter.get("/:id",estadoControlador.getEstadoById);


module.exports= estadoRouter;

