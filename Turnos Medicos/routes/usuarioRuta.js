const express= require("express");
const usuarioRouter = express.Router();
const usuarioControlador = require("../controllers/usuarioControlador");


usuarioRouter.get("/",usuarioControlador.getUsuarios);
usuarioRouter.post("/create",usuarioControlador.createUsuario);
usuarioRouter.post("/update/:id",usuarioControlador.updateUsuario);
usuarioRouter.get("/:id",usuarioControlador.getUsuarioById);
usuarioRouter.post("/delete/:id",usuarioControlador.deleteUsuario);


module.exports= usuarioRouter;

