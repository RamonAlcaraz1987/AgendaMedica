const express = require("express");
const antecedenteRouter = express.Router();
const antecedenteControlador = require("../controllers/antecedenteControlador");


antecedenteRouter.get("/",antecedenteControlador.getAntecedentes);
antecedenteRouter.get("/:id",antecedenteControlador.getAntecedenteById);
antecedenteRouter.post("/create",antecedenteControlador.createAntecedente);
antecedenteRouter.post("/update",antecedenteControlador.updateAntecedente);
antecedenteRouter.delete("/delete/:id",antecedenteControlador.deleteAntecedente);

module.exports = antecedenteRouter;