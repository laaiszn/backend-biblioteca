import Aluno from "../model/Aluno.js";
import type { Request, Response } from "express";

class AlunoController extends Aluno {
  // Listar todos os alunos
  static async todos(req: Request, res: Response): Promise<Response> {
    try {
      const listaAlunos: Array<Aluno> | null = await Aluno.listarAlunos();
      return res.status(200).json(listaAlunos);
    } catch (error) {
      console.error("Erro ao consultar alunos:", error);
      return res
        .status(500)
        .json({ mensagem: "Não foi possível acessar a lista de alunos." });
    }
  }

  // Cadastrar novo aluno
  static async novo(req: Request, res: Response): Promise<Response> {
    try {
      const dadosRecebidosAluno = req.body;
      const respostaModelo = await Aluno.cadastrarAluno(dadosRecebidosAluno);

      if (respostaModelo) {
        return res
          .status(201)
          .json({ mensagem: "Aluno cadastrado com sucesso." });
      } else {
        return res.status(400).json({ mensagem: "Erro ao cadastrar aluno." });
      }
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      return res
        .status(500)
        .json({ mensagem: "Não foi possível inserir o aluno." });
    }
  }

  // Buscar aluno por matrícula
  static async aluno(req: Request, res: Response): Promise<Response> {
    try {
      const matricula = req.params.matricula as string;

      if (matricula || matricula.length < 3) {
        return res.status(400).json({ mensagem: "Matrícula inválida." });
      }

      const respostaModelo = await Aluno.listarAluno(matricula);

      if (respostaModelo == null) {
        return res
          .status(404)
          .json({ mensagem: "Nenhum aluno encontrado com essa matrícula." });
      }

      return res.status(200).json(respostaModelo);
    } catch (error) {
      console.error("Erro ao recuperar aluno:", error);
      return res
        .status(500)
        .json({ mensagem: "Não foi possível recuperar o aluno." });
    }
  }
}

export default AlunoController;
