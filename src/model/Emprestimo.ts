import DatabaseModel from "./DatabaseModel.js";
import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";

const database = new DatabaseModel().pool;

class Emprestimo {
  private idEmprestimo?: number;
  private idAluno: number;
  private idLivro: number;
  private dataEmprestimo: Date;
  private dataDevolucao: Date;
  private statusEmprestimo: string;

  constructor(
    _idAluno: number,
    _idLivro: number,
    _dataEmprestimo: Date,
    _dataDevolucao: Date,
    _statusEmprestimo: string
  ) {
    this.idAluno = _idAluno;
    this.idLivro = _idLivro;
    this.dataEmprestimo = _dataEmprestimo;
    this.dataDevolucao = _dataDevolucao;
    this.statusEmprestimo = _statusEmprestimo;
  }

  public getIdAluno(): number {
    return this.idAluno;
  }

  public setIdAluno(idAluno: number): void {
    this.idAluno = idAluno;
  }

  public getIdLivro(): number {
    return this.idLivro;
  }

  public setIdLivro(idLivro: number): void {
    this.idLivro = idLivro;
  }

  public getDataEmprestimo(): Date {
    return this.dataEmprestimo;
  }

  public setDataEmprestimo(dataEmprestimo: Date): void {
    this.dataEmprestimo = dataEmprestimo;
  }

  public getDataEvolucao(): Date {
    return this.dataDevolucao;
  }

  public setDataEvolucao(dataDevolucao: Date): void {
    this.dataDevolucao = dataDevolucao;
  }

  public getStatusEmprestimo(): string {
    return this.statusEmprestimo;
  }
  public setStatusEmprestimo(statusEmprestimo: string): void {
    this.statusEmprestimo = statusEmprestimo;
  }

  public getIdEmprestimo(): number | undefined {
    return this.idEmprestimo;
  }

  public setIdEmprestimo(idEmprestimo: number): void {
    this.idEmprestimo = idEmprestimo;
  }

  static async listarEmprestimos(): Promise<Array<Emprestimo> | null> {
    try {
      let listaDeEmprestimos: Array<Emprestimo> = [];

      const querySelectEmprestimo = `SELECT * FROM Emprestimo;`;

      const respostaBD = await database.query(querySelectEmprestimo);

      respostaBD.rows.forEach((emprestimoBD) => {
        const novoEmprestimo: Emprestimo = new Emprestimo(
          emprestimoBD.id_aluno,
          emprestimoBD.id_livro,
          new Date(emprestimoBD.data_emprestimo),
          new Date(emprestimoBD.data_devolucao),
          emprestimoBD.status_emprestimo
        );

        novoEmprestimo.setIdEmprestimo(emprestimoBD.id_emprestimo);

        listaDeEmprestimos.push(novoEmprestimo);
      });

      return listaDeEmprestimos;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);

      return null;
    }
  }
  static async cadastrarEmprestimo(
    emprestimo: EmprestimoDTO
  ): Promise<boolean> {
    try {
      const queryInsertEmprestimo = `INSERT INTO Emprestimo 
      (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo)
      VALUES 
      ($1, $2, $3, $4, $5)
      RETURNING id_emprestimo;`;
      const respostaBD = await database.query(queryInsertEmprestimo, [
        emprestimo.dataEmprestimo,
        emprestimo.dataDevolucao,
        emprestimo.statusEmprestimo,
      ]);
      if (respostaBD.rows.length > 0) {
        console.info(
          `Emprestimo cadastrado com sucesso. ID: ${respostaBD.rows[0].id_emprestimo}`
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);
      return false;
    }
  }
}

export default Emprestimo;
