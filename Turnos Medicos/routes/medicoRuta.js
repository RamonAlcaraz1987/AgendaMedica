const express= require("express");
const medicoRouter = express.Router();

const medicoControlador = require("../controllers/medicoControlador");

medicoRouter.get("/",medicoControlador.getMedicos);

medicoRouter.get("/:id",medicoControlador.getMedicoById);




// medicoRouter.get("/",medicoControlador.listar);

// medicoRouter.get("/create",medicoControlador.crear);

// medicoRouter.get("/edit/:id",medicoControlador.editar);
// medicoRouter.post("/edit/:id",medicoControlador.update);

//  medicoRouter.post("/activate/:id",medicoControlador.activate);
// //  medicoRouter.post("/inactivate/:id",medicoControlador.inactivate);
//   medicoRouter.get("/",medicoControlador.index);


 module.exports= medicoRouter;