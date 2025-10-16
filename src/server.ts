import express from "express"; 
import cors from "cors";
import { router } from "./routes.js";

const server = express(); //cria um servidor http
server.use(cors()); //configura o servidor para usar o cors
server.use(express.json()); //configura o servidor para usar o json
server.use(router); //adiciona as rotas ao servidor http

export {server}; //exporta o servidor