import { Router } from "express";
import type {Request, Response} from "express";
import LivroController from "./controller/LivrosController.js";
import AlunoController from "./controller/AlunoController.js";
import EmprestimoController from "./controller/EmprestimoController.js";

const router: Router = Router();

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem-vindo a Biblioteca!" });
});

router.get("/api/livros", LivroController.todos);
router.post("/api/livros", LivroController.novo);
router.get("/api/livros/:id", LivroController.livro);

router.get("/api/alunos", AlunoController.todos);
router.post("/api/alunos", AlunoController.novo);
router.get("/api/alunos/:id", AlunoController.aluno);

router.get("/api/emprestimos", EmprestimoController.todos);

export {router};