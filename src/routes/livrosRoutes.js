import express, { json } from 'express';
import LivroController from '../controller/livroController.js';

const routes = express.Router();

routes.get("/liveos",LivroController.listarLivros)