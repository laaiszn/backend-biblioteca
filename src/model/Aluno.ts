import type { AlunoDTO } from "../interface/AlunoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Aluno {
  private id_aluno: number;
  private ra: string;
  private nome: string;
  private sobrenome: string;
  private nascimento_data: Date;
  private endereco: string;
  private email: string;
  private celular: string;

  constructor(
    _id_aluno: number,
    _ra: string,
    _nome: string,
    _sobrenome: string,
    _nascimento_data: Date,
    _endereco: string,
    _email: string,
    _celular: string
  ) {
    this.id_aluno = _id_aluno;
    this.ra = _ra;
    this.nome = _nome;
    this.sobrenome = _sobrenome;
    this.nascimento_data = _nascimento_data;
    this.endereco = _endereco;
    this.email = _email;
    this.celular = _celular;
  }

  public getIdAluno(): number {
    return this.id_aluno;
  }

  public getRa(): string {
    return this.ra;
  }

  public getNome(): string {
    return this.nome;
  }

  public getSobrenome(): string {
    return this.sobrenome;
  }

  public getNascimentoData(): Date {
    return this.nascimento_data;
  }

  public getEndereco(): string {
    return this.endereco;
  }

  public getEmail(): string {
    return this.email;
  }

  public getCelular(): string {
    return this.celular;
  }

  public setIdAluno(id_aluno: number): void {
    this.id_aluno = id_aluno;
  }

  public setRa(ra: string): void {
    this.ra = ra;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public setSobrenome(sobrenome: string): void {
    this.sobrenome = sobrenome;
  }

  public setNascimentoData(nascimento_data: Date): void {
    this.nascimento_data = nascimento_data;
  }

  public setEndereco(endereco: string): void {
    this.endereco = endereco;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setCelular(celular: string): void {
    this.celular = celular;
  }
  static async listarAlunos(): Promise<Array<Aluno> | null> {
    try {
      let listarAlunos: Array<Aluno> = [];
      const querySelectAlunos = "SELECT * FROM alunos;";
      const respostaBD = await database.query(querySelectAlunos);

      respostaBD.rows.forEach((aluno: any) => {
        const novoAluno = new Aluno(
          aluno.id_aluno,
          aluno.ra,
          aluno.nome,
          aluno.sobrenome,
          aluno.nascimento_data,
          aluno.endereco,
          aluno.email,
          aluno.celular
        );
        novoAluno.setIdAluno(aluno.id_aluno);
        listarAlunos.push(novoAluno);
      });
      return listarAlunos;
    } catch (error) {
      console.error("Erro ao listar alunos:", error);
      return null;
    }
  }
  static async cadastrarAluno(ra: string): Promise<Aluno | null> {
    try {
      const querySelectAluno = "SELECT * FROM alunos WHERE ra = $1;";
      const respostaBD = await database.query(querySelectAluno, [ra]);

      if (respostaBD.rowCount != 0) {
        const aluno: Aluno = new Aluno(
          respostaBD.rows[0].id_aluno,
          respostaBD.rows[0].ra,
          respostaBD.rows[0].nome,
          respostaBD.rows[0].sobrenome,
          respostaBD.rows[0].nascimento_data,
          respostaBD.rows[0].endereco,
          respostaBD.rows[0].email,
          respostaBD.rows[0].celular
        );
        aluno.setIdAluno(respostaBD.rows[0].id_aluno);
        return aluno;
      }
      return null;
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      return null;
    }
  }
}
export default Aluno;
