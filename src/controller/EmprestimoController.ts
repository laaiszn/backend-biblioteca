import Emprestimo from "../model/Emprestimo.js";
import type { Request, Response } from "express";

class EmprestimoController extends Emprestimo {
  static async todos(req: Request, res: Response): Promise<Response> {
    try {
      const listaEmprestimos: Array<Emprestimo> | null =
        await Emprestimo.listarEmprestimos();
      return res.status(200).json(listaEmprestimos);
    } catch (error) {
      console.error("Erro ao consultar empréstimos:", error);
      return res
        .status(500)
        .json({ mensagem: "Não foi possível acessar a lista de empréstimos." });
    }
  }

  static async novo(req: Request, res: Response): Promise<Response> {
    try {
      const dadosEmprestimo = req.body;
      const respostaModelo = await Emprestimo.cadastrarEmprestimo(
        dadosEmprestimo
      );

      if (respostaModelo) {
        return res
          .status(201)
          .json({ mensagem: "Empréstimo registrado com sucesso." });
      } else {
        return res
          .status(400)
          .json({ mensagem: "Erro ao registrar empréstimo." });
      }
    } catch (error) {
      console.error("Erro ao registrar empréstimo:", error);
      return res
        .status(500)
        .json({ mensagem: "Não foi possível registrar o empréstimo." });
    }
  }
}

export default EmprestimoController;
